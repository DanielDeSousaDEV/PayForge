<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $user = Auth::user();

        return [
            'email' => ['required', 'string', 'email', Rule::unique('users', 'email')->ignore($user ?? 0) ],
            'name' => ['required', 'string', 'min:2'],
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
        ];
    }
}
