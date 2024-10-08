<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Brand::query();

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $brands = $query->paginate(10);

        return inertia('Backend/Brand/Index', [
            'brands' => BrandResource::collection($brands),
            'queryParams' => request()->query() ?: null,
            'options' => session('options'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return inertia('Backend/Brand/Show', [
            'brand' => new BrandResource($brand),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoryList = Category::all();

        return inertia('Backend/Brand/Create', [
            'categoryList' => $categoryList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $validatedForm = $request->validated();

        if ($request->file('logo')) {
            $validatedForm['logo'] = $request->file('logo')->store('brands/' . Str::random() . '/logo', 'public');
        }
        $validatedForm['created_by'] = Auth::id();
        $validatedForm['updated_by'] = Auth::id();

        $brand = Brand::create($validatedForm);

        $cat = Category::find($validatedForm['categories']);

        $brand->categories()->saveMany($cat);

        $options = [
            'message' => "Brand: " . Str::upper($brand->name) . " was created!",
            'action' => "create",
        ];

        return to_route('brands.index')->with('options', $options);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        $categoryList = Category::all();

        return inertia('Backend/Brand/Edit', [
            'brand' => new BrandResource($brand),
            'categoryList' => $categoryList
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $validatedForm = $request->validated();

        $image = $validatedForm['logo'] ?? null;

        if ($image) {
            if ($brand->logo) {
                Storage::disk('public')->deleteDirectory(dirname($brand->logo, 2));
            }
            $validatedForm['logo'] = $image->store('brands/' . Str::random() . '/logo', 'public');
        } else {
            $validatedForm['logo'] = $brand->logo;
        }

        $validatedForm['updated_by'] = Auth::id();

        $brand->update($validatedForm);

        $cat = Category::find($validatedForm['categories']);
        $brand->categories()->sync($cat);

        $options = [
            'message' => "Brand: " . Str::upper($brand->name) . " was updated!",
            'action' => "update",
        ];

        return to_route('brands.index')->with('options', $options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        Storage::disk('public')->deleteDirectory(dirname($brand->logo, 2));
        $brand->delete();
        $options = [
            'message' => "Brand: " . Str::upper($brand->name) . " was deleted!",
            'action' => "delete",
        ];

        return to_route('brands.index')->with('options', $options);
    }
}
