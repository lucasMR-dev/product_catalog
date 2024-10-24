<?php

namespace App\Http\Requests;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'sku' => ['required', 'string', 'min:8', 'max:12'],
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'slug' => ['required', 'string'],
            'description' => ['required', 'string'],
            'images' => ['nullable', 'array'],
            'brand_id' => ['required', Rule::exists(Brand::class, 'id')],
            'categories' => ['nullable', 'array', Rule::exists(Category::class, 'id')],
            'stock' => ['nullable', 'numeric'],
            'price' => ['nullable', 'numeric'],
            'optionsAvailable' => ['nullable', 'array']
        ];
    }
}
