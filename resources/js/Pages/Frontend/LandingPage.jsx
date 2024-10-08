import { Link, Head, router } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, MoonIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Constants from '@/Constants';

const site = import.meta.env.VITE_APP_NAME;
const currentYear = new Date().getFullYear();

const classes = Constants.gridClasses;

const options = [
    { name: 'Name: A-Z', order: 'ASC' },
    { name: 'Price: Low to High', order: 'ASC' },
    { name: 'Price: High to Low', order: 'DESC' },
]

export default function LandingPage({ categories, brands, products, searchParams = null }) {
    const [darkMode, setDarkMode] = useState((localStorage.theme) === 'dark' ? true : false);
    const [active, setActive] = useState(searchParams !== null ? searchParams.category : 0);
    searchParams = searchParams || {};
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (darkMode) {
            htmlElement.classList.add("dark");
            localStorage.theme = 'dark';
        } else {
            htmlElement.classList.remove("dark");
            localStorage.theme = 'light';
        }
    }, [darkMode]);

    const toogleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const searchFilter = (field, value) => {
        if (field && value || value > 0) {
            searchParams[field] = value;
        }
        else {
            delete searchParams[field];
            router.reload(window.location.pathname);
        }
        router.get(route('catalog.index', searchParams));
    }

    const searchEnter = (field, e) => {
        if (e.key !== 'Enter') {
            return;
        }
        else {
            searchFilter(field, e.target.value);
        }
    }

    const categoryFilter = (field, e) => {
        setActive(e.target.value);
        searchFilter(field, e.target.value);
    }

    return (
        <>
            <header>
                <Head title="Products Catalog" />
                <div className="grid grid-cols-4 mt-2 md:mt-auto gap-4 dark:bg-gray-800">
                    <div className="col-start-1 col-span-3 ml-5 h-full md:py-7 lg:ml-44">
                        <div className="relative flex flex-wrap">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <MagnifyingGlassIcon className="mx-2 size-4 text-gray-500 dark:text-gray-300" />
                            </div>
                            <input id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                                rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Product name or description..."
                                defaultValue={searchParams.name}
                                onBlur={(e) => searchFilter("name", e.target.value)}
                                onKeyDown={(e) => searchEnter("name", e)}
                            />
                        </div>
                    </div>
                    <div className="self-center md:py-8">
                        <ShoppingCartIcon className="mx-2 size-7 md:size-10 text-gray-500 dark:text-gray-300" />
                    </div>
                    <div className="hidden md:block">
                        <label className="absolute top-10 right-3 lg:right-5 inline-flex items-center cursor-pointer">
                            <input id="darkToogle" type="checkbox" checked={darkMode} onChange={toogleDarkMode} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full 
                        peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                        dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                        after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <MoonIcon className="mx-2 size-6 text-gray-500 dark:text-gray-300" />
                        </label>
                    </div>
                </div>
            </header>
            <main>
                <div className="dark:bg-gray-800">
                    {/* Sub Header */}
                    <div className="grid grid-rows-1 gap-4 justify-items-center">
                        <div className="py-4 md:flex md:flex-wrap md:items-center md:justify-center">
                            <div>
                                <select
                                    id="brandFilter"
                                    className={classes}
                                    defaultValue={searchParams.brand}
                                    onChange={(e) => searchFilter('brand', e.target.value)}
                                >
                                    <option value="">Brands</option>
                                    {brands.data.map((brand) => {
                                        return (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <select
                                    id="category_filter"
                                    className={classes}
                                    defaultValue={searchParams.category}
                                    onChange={(e) => categoryFilter('category', e)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.data.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {/** 
                                <ul id="categoryList">
                                    <li
                                        className={classes}
                                        value={0}
                                        onClick={(e) => categoryFilter('category', e)}
                                    >
                                        All categories
                                    </li>

                                    {categories.data.map((category) => {
                                        return (
                                            <div key={category.id} className="flex text-center inline-flex items-center">
                                                <li
                                                    className={active == category.id ? classes + " active" : classes}
                                                    value={category.id}
                                                    onClick={(e) => categoryFilter('category', e)}
                                                >
                                                    {category.name}
                                                    <XMarkIcon className={active == category.id ? "display-block size-4" : "hidden"} />
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            */}
                            <div>
                                <select
                                    id="filter_tag"
                                    className={classes}
                                    defaultValue={searchParams.filterSort}
                                    onChange={(e) => searchFilter('filterSort', e.target.value)}
                                >
                                    <option value="">Filter by: Recommended</option>
                                    {options.map((option, index) => {
                                        return (
                                            <option key={index} value={option.name + " / " + option.order}>{option.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Grid */}
                    <div className="w-4/5 mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                products.data.map((product) => {
                                    const images = JSON.parse(product.images);
                                    return (

                                        <div key={product.id} className="h-auto max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <Link  href={route('catalog.product', product.id)}>
                                                <img className="p-8 h-32 w-full md:h-56 lg:h-96 rounded-t-lg"
                                                    src={Constants.Storage + images[0].image_path}
                                                    alt="product image"
                                                />
                                            </Link>
                                            <div className="px-5 pb-5">
                                                <div className="flex items-center justify-between">
                                                    <h5 className="md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </h5>
                                                    <img className="p-8 h-20  rounded-t-lg"
                                                        src={Constants.Storage + product.brand.logo}
                                                        alt="brand logo"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="lg:text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                                                    <span className="md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs lg:text-sm
                                                        px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800">Add to cart</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-white dark:bg-gray-800">
                <div className="mx-auto p-2 md:py-8">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {currentYear} <a href="/" className="hover:underline">{site}™</a>. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </>
    );
}
