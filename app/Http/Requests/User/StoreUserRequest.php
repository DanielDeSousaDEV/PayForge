<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'string', 'email', 'min:2', 'max:255'],
            'password' => ['required', 'string', 'min:2', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'O nome é obrigatório.',
            'name.string'    => 'O nome deve ser um texto.',
            'name.min'       => 'O nome precisa ter pelo menos :min caracteres.',
            'name.max'       => 'O nome não pode ter mais que :max caracteres.',

            'email.required' => 'O e-mail é obrigatório.',
            'email.string'   => 'O e-mail deve ser um texto.',
            'email.email'    => 'O e-mail informado não é válido.',
            'email.min'      => 'O e-mail precisa ter pelo menos :min caracteres.',
            'email.max'      => 'O e-mail não pode ter mais que :max caracteres.',

            'password.required' => 'A senha é obrigatória.',
            'password.string'   => 'A senha deve ser um texto.',
            'password.min'      => 'A senha precisa ter pelo menos :min caracteres.',
            'password.max'      => 'A senha não pode ter mais que :max caracteres.',
        ];
    }
}
