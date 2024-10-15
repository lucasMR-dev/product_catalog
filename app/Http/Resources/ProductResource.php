<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' =>$this->sku,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'images' => $this->images,
            'stock' => $this->stock,
            'price' => $this->price,
            'optionsAvailable' => $this->optionsAvailable,
            'categories' => $this->categories,
            'brand' => new BrandResource($this->brand),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy)
        ];
    }
}
