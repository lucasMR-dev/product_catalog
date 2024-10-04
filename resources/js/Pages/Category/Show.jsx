import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import * as Constants from '../../Constants';

export default function Show({ auth, category }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Category Details</h2>}
        >
            <Head title="Show" />

            <div className="format mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Category: {category.name}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 dark:text-white">
                    <div>
                        <p>Related Brands:</p>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center my-6">
                            {category.brands.map((brand) => (
                                <Link
                                    key={brand.id}
                                    href={route('brands.edit', brand.id)}
                                    className="dark:text-white"
                                >
                                    <img src={Constants.Storage + brand.logo}
                                        className="mr-2 mb-2 w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 cursor-pointer object-cover"
                                        alt=""
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 dark:text-white">
                    <div>
                        <p>Related Products:</p>
                    </div>
                    <div>
                        <ul className="list-none rounded-lg">
                            {category.products.map((product) => {
                                return (
                                    <li className="rounded-t-lg" key={product.id}>
                                        <Link
                                            href={route('products.show', product.id)}
                                            className="dark:text-white"
                                        >
                                            {product.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}