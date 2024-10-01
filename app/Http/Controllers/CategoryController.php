<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Category::query();

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $categories = $query->paginate(10);

        return inertia("Category/Index", [
            'categories' => CategoryResource::collection($categories),
            'queryParams' => request()->query() ?: null,
            'options' => session('options'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $validatedForm = $request->validated();
        $validatedForm['created_by'] = Auth::id();
        $validatedForm['updated_by'] = Auth::id();

        $category = Category::create($validatedForm);

        $options = [
            'message' => "Category: " . Str::upper($category->name) . " was created!",
            'action' => "create",
        ];

        return to_route('categories.index', $category)->with('options', $options);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Category/Show', [
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validatedForm = $request->validated();
        $validatedForm['created_by'] = Auth::id();
        $validatedForm['updated_by'] = Auth::id();

        $category->update($validatedForm);

        $options = [
            'message' => "Category: " . Str::upper($category->name) . " was updated!",
            'action' => "update",
        ];

        return to_route('categories.index')->with('options', $options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        $options = [
            'message' => "Category: " . Str::upper($category->name) . " was deleted!",
            'action' => "delete",
        ];

        return to_route('categories.index')->with('options', $options);
    }
}
