import { Link, Head, router } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';
import * as Constants from '@/Constants';
import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Components/Pagination';
import InputLabel from '@/Components/InputLabel';

export default function LandingPage({ categories, brands, products, searchParams = null }) {
    // Query Params
    searchParams = searchParams || {};
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
    return (
        <MainLayout
            searchParams={searchParams}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products Catalog</h2>}
        >
            <Head title="Catalog" />
            {/* Sub Header */}
            <div className="dark:bg-gray-800">
                <div className="grid grid-rows-1 gap-4 justify-items-center">
                    <div className="py-4 md:flex md:flex-wrap md:items-center md:justify-center">
                        <div className="flex ">
                            <InputLabel value="Order by:" className="self-center mr-2" />
                            <select
                                id="filter_tag"
                                className={Constants.filterClasses}
                                defaultValue={searchParams.filterSort}
                                onChange={(e) => searchFilter('filterSort', e.target.value)}
                            >
                                <option value="">Recommended</option>
                                {Constants.sortBy.map((option, index) => {
                                    return (
                                        <option key={index} value={option.name + " / " + option.order}>{option.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                id="brandFilter"
                                className={Constants.filterClasses}
                                defaultValue={searchParams.brand}
                                onChange={(e) => searchFilter('brand', e.target.value)}
                            >
                                <option value="">Brands</option>
                                {brands.data.map((brand) => {
                                    return (
                                        <option key={brand.id} value={brand.name}>{brand.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                id="category_filter"
                                className={Constants.filterClasses}
                                defaultValue={searchParams.category}
                                onChange={(e) => searchFilter('category', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.data.map((category, index) => {
                                    return (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex">
                            <InputLabel value="Per Page:" className="self-center mx-2" />
                            <select
                                id="pagination"
                                className={Constants.filterClasses}
                                defaultValue={searchParams.perPage}
                                onChange={(e) => searchFilter('perPage', e.target.value)}
                            >
                                <option value="">Default</option>
                                {Constants.pagination.map((option, index) => {
                                    return (
                                        <option key={index} value={option.name}>{option.name}</option>
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
                                    <Link key={product.id} href={route('catalog.product', product.slug)}>
                                        <div className="h-auto max-w-full bg-white border border-gray-200 
                                            rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <img className="p-8 h-32 w-full md:h-56 lg:h-96 rounded-t-lg"
                                                src={Constants.Storage + images[0].image_path}
                                                alt="product image"
                                            />
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
                                                    <span className="lg:text-3xl font-bold text-gray-900 dark:text-white">
                                                        <NumericFormat
                                                            value={product.price}
                                                            displayType={'text'}
                                                            thousandSeparator={'.'}
                                                            decimalSeparator={','}
                                                            prefix={'$'}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <Pagination links={products.meta.links} />
                </div>
            </div>
        </MainLayout>
    );
}
