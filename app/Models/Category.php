<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_by', 'updated_by'];

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'brand_category');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'category_product');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
