<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Nominee;
use App\Models\Package;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\ElectionEvent;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use App\Services\Payments\TicketService;
use App\Services\Payments\PaymentService;


class PaymentController extends Controller


{

    public function redirectToGateway(Request $request, $slug)
    {

        $event = Event::where("slug", $slug)->first();

        $request->validate([
            'email' => 'required|email',
            'phone' => 'nullable|regex:/^0\d{9}$/',
            'payment_type' => 'required|in:ticket,vote,event',
            'purchased_ticket_id' => 'nullable|integer',
            'paid_vote_count_id' => 'nullable|integer',
        ]);

        if ($request->payment_type !== 'event' && !$request->phone) {
            return back()->withErrors(['phone' => 'The phone field is required for this payment type.']);
        }

        try {

            switch ($request->payment_type) {

                case 'event':
                    if (!$request->email) {
                        // throw new Exception("Nominee ID, voter name, and number of votes are required for 'vote' payment type.");
                        return back()->with([
                            'error' => 'Email is required for Event payment.',
                        ]);
                    }
                    $eventId = $event->id;
                    $email =  $request->input('email');
                    $eventType = $event->type;
                    $userId =  User::where('email', $email)->value('id');
                    if ($eventType === 'normal') {
                        $amount = config('webapp.private_ticketing_flat_fee', 149);
                    } elseif ($eventType === 'election') {
                        $amount = config('webapp.private_election_flat_fee', 149);
                    }
                    break;

                case 'vote':
                    if (!$request->nominee_id || !$request->name || !$request->number_of_votes) {
                        // throw new Exception("Nominee ID, voter name, and number of votes are required for 'vote' payment type.");
                        return back()->with([
                            'error' => 'Nominee ID, voter name, and number of votes are required for vote payment.',
                        ]);
                    }
                    $pricePerVote = ElectionEvent::where('slug', $slug)->value('price_per_vote') ?? 1;
                    $numberOfVotes = $request->input('number_of_votes');
                    $amount = $pricePerVote * $numberOfVotes;
                    break;

                case 'ticket':
                    if (!$request->package_id || !$request->name || !$request->email) {
                        // throw new \Exception("Package ID, Name and Email is required for 'ticket' payment type.");

                        return back()->with([
                            'error' => 'Refresh page, Package ID, Name and Email is required for ticket payment.',
                        ]);
                    }

                    $packageId = $request->input('package_id');
                    $package = Package::findOrFail($packageId);
                    $packageName = $package->name;
                    $amount = $package->price;

                    if ($amount === 0) {
                        return redirect()->route('event.free')->with([
                            'message' => [
                                "event_title" => $event->name ?? 'EVENT',
                                "slug" => $event->slug ?? 'EVENT',
                                "name" => $request->input('name') ?? 'UNKNOWN',
                                "attendee_id" => $request->input('attendee_id'),
                                "phone" => $request->input('phone') ?? NULL,
                                "email" => $request->input('email'),
                                'package_id' => $packageId,
                                'package_name' => $packageName,
                            ],

                        ]);
                    }
                    break;

                default:
                    // throw new \Exception("Invalid payment type.");
                    return back()->with([
                        'error' => 'Invalid payment type.',
                    ]);
            }


            $reference = paystack()->genTranxRef();

            $paymentData = [
                'transaction_id' => $reference,
                'payment_type' => $request->payment_type,
                "phone" => $request->input('phone') ?? NULL,
                "email" => $request->input('email'),
                'amount' => $amount,
                'paid_by' => $request->input('phone') ?? NULL,
                'currency' => "GHS",
                'payment_reference' => $reference,
                'payment_method' => 'paystack',
                'payment_date' => now(),
                'status' => 'pending',
            ];

            $serviceFee = 0.02 * $amount;

            $ticketAmount = ceil(($amount + $serviceFee) * 100);

            $data = array(
                "amount" => $ticketAmount,
                "currency" => "GHS",
                "email" => $request->email,
                "reference" => $reference,
                // "callback_url" => route('paystack.callback'),
                "callback_url" => route('payment.pending.verification'),
                "metadata" => [
                    "event_title" => $event->name ?? 'EVENT',
                    "name" => $request->input('name') ?? 'UNKNOWN',
                    "phone" => $request->input('phone') ?? NULL,
                    "email" => $request->input('email'),
                    "nominee_id" => $request->input('nominee_id'),
                    "event_id" => $eventId ?? NULL,
                    "number_of_votes" => $numberOfVotes ?? NULL,
                    "user_id" => $userId ?? NULL,
                    "slug" => $slug,
                    "attendee_id" => $request->input('attendee_id'),
                    "package_name" => $packageName ?? NULL,
                    "package_id" => $packageId ?? NULL
                ],
            );
            $url = paystack()->getAuthorizationUrl($data);
            Payment::create($paymentData);
            return Inertia::location($url->url);
        } catch (Exception $e) {
            // dd($e->getMessage());
            return back()->with([
                'error' => 'Couldn\'t  initiate payment. Connect and try Again',
            ]);
        }
    }

    public function handleGatewayCallback()
    {
        try {
            $paymentDetails = paystack()->getPaymentData();
            $reference = $paymentDetails['data']['reference'];
            $transactionId = $paymentDetails['data']['id'];
            $payment = Payment::where('payment_reference', $reference)->first();
            $metadata = $paymentDetails['data']['metadata'];

            if (!$payment) {
                // throw new Exception("Payment record not found.");
                return back()->with([
                    'Payment record not found.',
                ]);
            }

            $paymentService = new PaymentService();
            $status = $paymentService->handlePayment(
                paymentDetails: $paymentDetails,
                payment: $payment,
                metadata: $metadata,
                transactionId: $transactionId
            );

            switch ($status) {
                case 'event_success':
                    return redirect()
                        ->route('organiser.dashboard.event.specific', ['event' => $metadata['slug']])
                        ->with(['success' => 'Payment successful. You can go live now']);

                case 'vote_success':
                    $nomineeName = Nominee::findOrFail($metadata['nominee_id'])->name;
                    return redirect()
                        ->route('vote.success')
                        ->with(['message' => [
                            'success' => true,
                            'event' => $metadata['event_title'],
                            'name' => $nomineeName,
                            'amount' => "GH₵ " . $payment->amount,
                        ]]);

                case 'ticket_success':
                    return redirect()
                        ->route('ticket.purchase.success')
                        ->with(['message' => [
                            'success' => true,
                            'event' => $metadata['event_title'],
                            'package_name' => $metadata['package_name'],
                            'amount' => "GH₵ " . $payment->amount,
                        ]]);

                case 'missing_metadata':
                    return back()->with(['error' => 'Missing metadata in payment details.']);

                case 'missing_event_data':
                    return back()->with(['error' => 'Event is required for event payment.']);

                case 'missing_vote_data':
                    return back()->with(['error' => 'Nominee ID, voter name, and number of votes are required.']);

                case 'missing_ticket_data':
                    return back()->with(['error' => 'Package ID, name and email are required for ticket payment.']);

                case 'invalid_payment_type':
                    return back()->with(['error' => 'Invalid payment type.']);

                case 'payment_failed':
                    return back()->with(['error' => 'Payment failed.']);

                default:
                    return back()->with(['error' => 'Unhandled payment response.']);
            }
        } catch (Exception $e) {
            // Log the error message for debugging purposes
            Log::error("Payment handling error: " . $e->getMessage());

            // Return back with an error message
            return back()->with([
                'error' => 'An error occurred during payment processing: ' . $e->getMessage(),
            ]);
        }
    }




    public function handleWebhook(Request $request)
    {
        // First check is the headeris present. Else, terminate the code.
        if (!$request->hasHeader("x-paystack-signature")) exit("No header present");

        // Get our paystack screte key from our .env file
        $secret = env("PAYSTACK_SECRET_KEY");

        // Validate the signature
        if ($request->header("x-paystack-signature") !== hash_hmac("sha512", $request->getContent(), $secret)) exit("Invalid signatute");

        $event = $request->event; // event type. e.g charge.success
        $data = $request->data;

        if ($event === "charge.success") {

            // Log::info('details', $data);

            $reference = $data["reference"];
            $payment = Payment::where('payment_reference', $reference)->first();
            $metadata = $data['metadata'];
            $transactionId = $data['id'];

            $paymentService = new PaymentService();

            $status = $paymentService->handlePayment(
                paymentDetails: $data,
                payment: $payment,
                metadata: $metadata,
                transactionId: $transactionId
            );

            // $successfulStatuses = [
            //     'event_success',
            //     'vote_success',
            //     'ticket_success',
            //     'payment_failed'
            // ];

            // Log::info('status', $data);



            if ($status) {
                return response()->json(['status' => 'success'], 200);
            }
        }
    }




    public function handleFreeTickets(Request $request)
    {
        // Retrieve session data
        $data = session('message');

        if ($data) {
            // Extract variables
            $slug = $data['slug'];
            $eventTitle = $data["event_title"];
            $attendeeId = $data['attendee_id'];
            $attendeeName = $data['name'];
            $packageId = $data['package_id'];
            $packageName = $data['package_name'];
            $phone = $data['phone'];
            // $amount = $data['amount'];
            $email = $data['email'];

            // Call TicketService
            $ticketService = new TicketService();
            $ticketService->saveTicket($slug, $attendeeId, $attendeeName, $packageId, $phone, 0, $email);


            return redirect()->route('ticket.purchase.success')->with([
                'message' => [
                    'success' => true,
                    'package_name' => $packageName,
                ],

            ]);
        }

        return response()->json(['error' => 'No session data found'], 400);
    }
}

"unicodeveloper/laravel-paystack": "^1.2"

Route::post('/payment/webhook', [PaymentController::class, 'handleWebhook'])
    ->middleware(RestrictIPMiddleware::class)
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->name('paystack.webhook');

    <?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictIPMiddleware
{
    /**
     * Allowed IPs.
     */
    protected $allowedIps = [
        '52.31.139.75',
        '52.49.173.169',
        '52.214.14.220',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->header('x-forwarded-for') ?? $request->ip();

        // if multiple IPs in header, take first one
        if (str_contains($ip, ',')) {
            $ip = explode(',', $ip)[0];
            $ip = trim($ip);
        }

        if (! in_array($ip, $this->allowedIps)) {
            abort(403, 'Access denied.');
        }

        return $next($request);
    }
}
