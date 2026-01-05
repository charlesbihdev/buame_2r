<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PhoneRegisterRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Models\Payment;
use App\Models\User;
use App\Services\PhoneVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(
        protected PhoneVerificationService $phoneVerificationService
    ) {}

    /**
     * Show the registration page.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        $category = $request->query('category');

        // Validate category if provided
        $validCategories = ['artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs'];
        if ($category && ! in_array($category, $validCategories)) {
            return redirect()->route('choose-path')->withErrors(['category' => 'Invalid category selected.']);
        }

        return Inertia::render('user/auth/phone-register', [
            'category' => $category,
        ]);
    }

    /**
     * Create user and send OTP for verification.
     */
    public function store(PhoneRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Check if user already exists
        $user = User::where('phone', $validated['phone'])->first();

        if ($user) {
            // User exists - check status
            if ($user->phone_verified_at) {
                // Phone already verified - check if they need to pay
                $hasPaidCategory = $user->categories()
                    ->whereHas('payment', function ($query) {
                        $query->where('status', 'completed');
                    })
                    ->exists();

                if ($hasPaidCategory) {
                    return redirect()->route('user.login')->with('status', 'Account already exists. Please log in.');
                } else {
                    // Phone verified but no payment - redirect to payment
                    $request->session()->put('registration_user_id', $user->id);
                    $request->session()->put('selected_category', $validated['category']);

                    return redirect()->route('user.register.payment');
                }
            } else {
                // User exists but phone not verified - send OTP
                $request->session()->put('registration_user_id', $user->id);
            }
        } else {
            // Create new user immediately
            $user = User::create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'] ?? null,
                'phone_verified_at' => null, // Will be set after OTP verification
                'is_active' => false, // Will be set to true after payment
            ]);

            // Store user_id and category in session
            $request->session()->put('registration_user_id', $user->id);
            $request->session()->put('selected_category', $validated['category']);
        }

        // Check rate limiting (applies to all OTP requests)
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($validated['phone']);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['phone' => $rateLimitCheck['message']]);
        }

        // Send OTP
        $result = $this->phoneVerificationService->sendOtp($validated['phone']);

        return redirect()->route('user.register.verify')->with('status', $result['message']);
    }

    /**
     * Show OTP verification page for registration.
     */
    public function showVerify(Request $request): Response|RedirectResponse
    {
        $userId = $request->session()->get('registration_user_id');

        if (! $userId) {
            return redirect()->route('user.register');
        }

        $user = User::find($userId);

        if (! $user) {
            return redirect()->route('user.register');
        }

        return Inertia::render('user/auth/verify-otp', [
            'phone' => $user->phone,
            'type' => 'register',
        ]);
    }

    /**
     * Verify OTP and proceed to payment.
     */
    public function verifyOtp(VerifyOtpRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $userId = $request->session()->get('registration_user_id');

        if (! $userId) {
            return redirect()->route('user.register')->withErrors(['phone' => 'Session expired. Please try again.']);
        }

        $user = User::find($userId);

        if (! $user || $user->phone !== $validated['phone']) {
            return redirect()->route('user.register')->withErrors(['phone' => 'Session expired. Please try again.']);
        }

        // Verify OTP
        $result = $this->phoneVerificationService->verifyOtp($validated['phone'], $validated['code']);

        if (! $result['success']) {
            return back()->withErrors(['code' => $result['message']]);
        }

        // Update user - mark phone as verified
        $user->update([
            'phone_verified_at' => now(),
        ]);

        // Login user immediately after successful OTP verification
        Auth::login($user);
        $request->session()->regenerate();

        // Check if category is selected
        $selectedCategory = $request->session()->get('selected_category');

        if (! $selectedCategory) {
            // If no category was selected, redirect to category selection page
            return redirect()->route('user.register.category');
        }

        // Redirect to payment (user is now logged in)
        return redirect()->route('user.register.payment');
    }

    /**
     * Show category selection page (for switching categories before payment).
     */
    public function showCategorySelection(Request $request): Response|RedirectResponse
    {
        // Check if user is authenticated (logged in after OTP verification)
        $user = Auth::user();

        // Fallback to session user_id if not authenticated
        if (! $user) {
            $userId = $request->session()->get('registration_user_id');
            if (! $userId) {
                return redirect()->route('user.register');
            }
            $user = User::find($userId);
        }

        if (! $user || ! $user->phone_verified_at) {
            return redirect()->route('user.register');
        }

        $categories = [
            ['value' => 'artisans', 'label' => 'Artisans', 'description' => 'Skilled workers', 'price' => 50],
            ['value' => 'hotels', 'label' => 'Hotel', 'description' => 'Accommodation services', 'price' => 100],
            ['value' => 'transport', 'label' => 'Okada', 'description' => 'Motorcycle transport', 'price' => 30],
            ['value' => 'rentals', 'label' => 'Rentals', 'description' => 'Property rentals', 'price' => 75],
            ['value' => 'marketplace', 'label' => 'Marketplace', 'description' => 'Buy & Sell goods', 'price' => 40],
            ['value' => 'jobs', 'label' => 'Jobs', 'description' => 'Career & Hiring', 'price' => 60],
        ];

        return Inertia::render('user/auth/select-category', [
            'categories' => $categories,
            'user' => [
                'name' => $user->name,
                'phone' => $user->phone,
            ],
        ]);
    }

    /**
     * Handle category selection and proceed to payment.
     */
    public function selectCategory(Request $request): RedirectResponse
    {
        $request->validate([
            'category' => ['required', 'string', 'in:artisans,hotels,transport,rentals,marketplace,jobs'],
        ]);

        // Check if user is authenticated (logged in after OTP verification)
        $user = Auth::user();

        // Fallback to session user_id if not authenticated
        if (! $user) {
            $userId = $request->session()->get('registration_user_id');
            if (! $userId) {
                return redirect()->route('user.register');
            }
            $user = User::find($userId);
        }

        if (! $user || ! $user->phone_verified_at) {
            return redirect()->route('user.register');
        }

        // Store selected category in session
        $request->session()->put('selected_category', $request->category);

        // Redirect to payment page
        return redirect()->route('user.register.payment');
    }

    /**
     * Show payment page.
     */
    public function showPayment(Request $request): Response|RedirectResponse
    {
        // Check if user is authenticated (logged in after OTP verification)
        $user = Auth::user();
        $selectedCategory = $request->session()->get('selected_category');

        // Fallback to session user_id if not authenticated
        if (! $user) {
            $userId = $request->session()->get('registration_user_id');
            if (! $userId || ! $selectedCategory) {
                return redirect()->route('user.register');
            }
            $user = User::find($userId);
        }

        if (! $user || ! $user->phone_verified_at) {
            return redirect()->route('user.register');
        }

        if (! $selectedCategory) {
            return redirect()->route('user.register.category');
        }

        $categoryPrices = [
            'artisans' => 50,
            'hotels' => 100,
            'transport' => 30,
            'rentals' => 75,
            'marketplace' => 40,
            'jobs' => 60,
        ];

        // Get all categories for switching
        $allCategories = [
            ['value' => 'artisans', 'label' => 'Artisans', 'price' => 50],
            ['value' => 'hotels', 'label' => 'Hotel', 'price' => 100],
            ['value' => 'transport', 'label' => 'Okada', 'price' => 30],
            ['value' => 'rentals', 'label' => 'Rentals', 'price' => 75],
            ['value' => 'marketplace', 'label' => 'Marketplace', 'price' => 40],
            ['value' => 'jobs', 'label' => 'Jobs', 'price' => 60],
        ];

        return Inertia::render('user/auth/payment', [
            'category' => $selectedCategory,
            'amount' => $categoryPrices[$selectedCategory] ?? 50,
            'categories' => $allCategories,
            'user' => [
                'name' => $user->name,
                'phone' => $user->phone,
            ],
        ]);
    }

    /**
     * Resend OTP code for registration.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $registrationData = $request->session()->get('registration_data');

        if (! $registrationData) {
            return redirect()->route('user.register');
        }

        // Check rate limiting (applies to all OTP requests)
        $rateLimitCheck = $this->phoneVerificationService->canRequestOtp($registrationData['phone']);
        if (! $rateLimitCheck['can_request']) {
            return back()->withErrors(['code' => $rateLimitCheck['message']]);
        }

        // Send OTP
        $result = $this->phoneVerificationService->sendOtp($registrationData['phone']);

        return back()->with('status', $result['message']);
    }
}
