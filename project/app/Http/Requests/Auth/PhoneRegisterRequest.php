<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PhoneRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^[0-9]{10,20}$/', 'unique:users,phone'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'category' => ['required', 'string', 'in:artisans,hotels,transport,rentals,marketplace,jobs'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'phone.required' => 'Phone number is required',
            'phone.regex' => 'Please enter a valid phone number',
            'phone.unique' => 'This phone number is already registered',
            'email.email' => 'Please enter a valid email address',
        ];
    }
}
