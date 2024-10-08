<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::query()->paginate(10);
        $categories = Category::query()->paginate(10);
        $products = Product::query();

        if (request("name")) {
            $products->where("name", "like", "%" . request("name") . "%");
        }

        if (request("brand")) {
            $products->where("brand_id", "=", intval(request("brand")));
        }

        if (request("category")) {
            $ids = [];
            array_push($ids, request("category"));
            $products->whereHas("categories", function ($query) use ($ids) {
                $query->whereIn('id', $ids);
            })->get();
        }

        $sort_field = "id";
        $sort_dir = "ASC";

        if (request("filterSort")) {
            $field = explode(":", request("filterSort"));
            $dir = explode("/ ", request("filterSort"));
            $sort_field = $field[0];
            $sort_dir = $dir[1];
        }

        return inertia('Frontend/LandingPage', [
            'products' => ProductResource::collection($products->orderBy($sort_field, $sort_dir)->paginate(10)),
            'categories' => CategoryResource::collection($categories),
            'brands' => BrandResource::collection($brands),
            'searchParams' => request()->query() ?: null
        ]);
    }

    /**
     * Display Single Product Information
     */
    public function show()
    {
        $product = Product::find(request()->id);
        return inertia('Frontend/Product/Show', [
            'product' => new ProductResource($product),
        ]);
    }
}
