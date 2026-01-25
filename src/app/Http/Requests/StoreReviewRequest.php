<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Visitors can submit reviews
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reviewer_name' => ['required', 'string', 'max:100'],
            'reviewer_phone' => ['required', 'string', 'max:20'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:1000'],
            'images' => ['nullable', 'array', 'max:3'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'reviewer_name.required' => 'Please enter your name.',
            'reviewer_phone.required' => 'Please enter your phone number.',
            'rating.required' => 'Please select a rating.',
            'rating.min' => 'Rating must be at least 1 star.',
            'rating.max' => 'Rating must be at most 5 stars.',
            'images.max' => 'You can upload a maximum of 3 images.',
            'images.*.image' => 'Each file must be an image.',
            'images.*.mimes' => 'Images must be in JPEG, PNG, JPG, or WebP format.',
            'images.*.max' => 'Each image must not exceed 2MB.',
        ];
    }
}
