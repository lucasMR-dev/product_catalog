<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query();

        $products = $query->paginate(10);

        return inertia('Product/Index', [
            'products' => ProductResource::collection($products),
            'options' => session('options'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoryList = Category::all();
        $brandList = Brand::all();

        return inertia('Product/Create', [
            'categoryList' => $categoryList,
            'brandList' => $brandList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedForm = $request->validated();
        $files = $request->file('images');
        if ($files) {
            $images = [];
            $i = 0;
            $attach = Str::random();
            foreach ($files as $file) {
                $image = $file->store('products/' . $attach . '/images', 'public');
                $i++;
                array_push($images, [
                    'image_path' => $image,
                    'display_pos' => $i
                ]);
            }
        }
        $validatedForm['images'] = json_encode($images);
        $validatedForm['created_by'] = Auth::id();
        $validatedForm['updated_by'] = Auth::id();

        $product = Product::create($validatedForm);

        $cat = Category::find($validatedForm['categories']);

        $product->categories()->saveMany($cat);

        $options = [
            'message' => "Product: " . Str::upper($product->name) . " was created!",
            'action' => "create",
        ];

        return to_route('products.index')->with('options', $options);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return inertia('Product/Show', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categoryList = Category::all();
        $brandList = Brand::all();

        return inertia('Product/Edit', [
            'product' => new ProductResource($product),
            'categoryList' => $categoryList,
            'brandList' => $brandList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validatedForm = $request->validated();
        $files = $request->file('images') ?? null;
        if ($files) {
            $images = [];
            $i = 0;
            $attach = Str::random();
            $imagesJson = json_decode($product->images);
            Storage::disk('public')->deleteDirectory(dirname($imagesJson[0]->image_path, 2));
            foreach ($files as $file) {
                $image = $file->store('products/' . $attach . '/images', 'public');
                $i++;
                array_push($images, [
                    'image_path' => $image,
                    'display_pos' => $i
                ]);
            }
            $validatedForm['images'] = json_encode($images);
        } else {
            $validatedForm['images'] = $product->images;
        }

        $validatedForm['updated_by'] = Auth::id();

        $product->update($validatedForm);

        $cat = Category::find($validatedForm['categories']);

        $product->categories()->sync($cat);

        $options = [
            'message' => "Product: " . Str::upper($product->name) . " was updated!",
            'action' => "update",
        ];

        return to_route('products.index')->with('options', $options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $imagesJson = json_decode($product->images);
        Storage::disk('public')->deleteDirectory(dirname($imagesJson[0]->image_path, 2));
        $product->delete();
        $options = [
            'message' => "Product: " . Str::upper($product->name) . " was deleted!",
            'action' => "delete",
        ];
        return to_route('products.index')->with('options', $options);
    }
}
