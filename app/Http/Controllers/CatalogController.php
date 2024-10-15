<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::query();
        $categories = Category::query();
        $products = Product::query();

        // Default Values
        $sort_field = "id";
        $sort_dir = "ASC";
        $perPage = 5;

        // Name Filter
        if (request("name")) {
            $products->where("name", "like", "%" . request("name") . "%");
        }

        // Brand Filter
        if (request("brand")) {
            $brand = Brand::whereName(request("brand"))->first();
            $id = [$brand->id];
            $categories->whereHas("brands", function ($query) use ($id) {
                $query->whereIn('id', $id);
            })->get();
            $products->where("brand_id", "=", $brand->id);
        }

        // Category Filter
        if (request("category")) {
            $category = Category::whereName(request("category"))->first();
            $id = [$category->id];
            $products->whereHas("categories", function ($query) use ($id) {
                $query->whereIn('id', $id);
            })->get();
            $brands->whereHas("categories", function ($query) use ($id) {
                $query->whereIn('id', $id);
            })->get();
        }

        // Order By
        if (request("filterSort")) {
            $field = explode(":", request("filterSort"));
            $dir = explode("/ ", request("filterSort"));
            $sort_field = $field[0];
            $sort_dir = $dir[1];
        }

        // Per Page
        if (request("perPage")) {
            $perPage = intval(request("perPage"));
        }

        return inertia('Frontend/LandingPage', [
            'products' => ProductResource::collection($products->orderBy($sort_field, $sort_dir)->paginate($perPage)->withQueryString()),
            'categories' => CategoryResource::collection($categories->paginate()),
            'brands' => BrandResource::collection($brands->paginate()),
            'searchParams' => request()->query() ?: null
        ]);
    }

    /**
     * Display Single Product Information
     */
    public function show()
    {
        $product = Product::where("slug", request()->slug)->first();
        return inertia('Frontend/Product/Show', [
            'product' => new ProductResource($product),
            'searchParams' => request()->query() ?: null
        ]);
    }
}
