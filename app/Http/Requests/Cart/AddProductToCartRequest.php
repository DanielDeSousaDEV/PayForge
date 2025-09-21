<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class AddProductToCartRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quantity' => ['required', 'integer', 'min:0']
        ];
    }

    public function messages(): array
    {
        return [
            'quantity.required' => 'Por favor informe a quantidade.',
            'quantity.integer' => 'Por favor informe a quantidade.',
            'quantity.min' => 'A quantidade deve ser maior que :min.'
        ];
    }
}
