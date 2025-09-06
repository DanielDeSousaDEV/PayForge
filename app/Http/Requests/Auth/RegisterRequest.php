<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'name' => ['required', 'string', 'min:2'],
            'password' => ['required', 'string', 'min:4'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O email é obrigatorio',
            'email.string' => 'O email é obrigatorio',
            'email.email' => 'Insira um email válido',
            'email.unique' => 'Este email já está cadastrado no sistema',

            'name.required' => 'O nome é obrigatorio',
            'name.string' => 'O nome é obrigatorio',
            'name.min' => 'O nome deve possui mais que :min caracteres',

            'password.required' => 'A senha é obrigatoria',
            'password.string' => 'A senha é obrigatoria',
            'password.min' => 'A senha deve ter no mínimo :min caracteres',
        ];
    }
}
