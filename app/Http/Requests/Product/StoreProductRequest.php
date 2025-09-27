<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'price' => ['required', 'numeric', 'min:0.01'],
            'preview_image' => ['required', 'file', 'mimes:jpg,bmp,png'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'file', 'mimes:jpg,bmp,png'],
            'description' => ['required', 'string', 'min:2', 'max:255']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do produto é obrigatório.',
            'name.string' => 'O nome do produto deve ser uma string.',
            'name.min' => 'O nome do produto deve ter no mínimo :min caracteres.',
            'name.max' => 'O nome do produto deve ter no máximo :max caracteres.',

            'price.required' => 'O preço é obrigatório.',
            'price.numeric' => 'O preço deve ser um número.',
            'price.min' => 'O preço mínimo é :min.',

            'preview_image.required' => 'A imagem de miniatura é obrigatória.',
            'preview_image.file' => 'A miniatura deve ser um arquivo.',
            'preview_image.mimes' => 'A miniatura deve ser um arquivo do tipo: :values.',

            'images.required' => 'As imagens são obrigatórias.',
            'images.array' => 'As imagens devem ser enviadas em um array.',
            'images.min' => 'É necessário enviar pelo menos :min imagem(s).',

            'images.*.required' => 'Cada imagem é obrigatória.',
            'images.*.file' => 'Cada imagem deve ser um arquivo.',
            'images.*.mimes' => 'Cada imagem deve ser do tipo: :values.',

            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.min' => 'A descrição deve ter no mínimo :min caracteres.',
            'description.max' => 'A descrição deve ter no máximo :max caracteres.',
        ];
    }
}
