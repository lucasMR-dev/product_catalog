<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class LadingPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::query()->paginate(10);
        $categories = Category::query()->paginate(10);
        $products = Product::query()->paginate(10);

        return inertia('LandingPage', [
            'products' => ProductResource::collection($products),
            'categories' => CategoryResource::collection($brands),
            'brands' => BrandResource::collection($categories)
        ]);
    }
}
