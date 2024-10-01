import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ClipboardDocumentCheckIcon, EyeIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import React from "react";

const TABLE_HEAD = ["ID", "Name", "Logo", "Categories"];
const classes = "format p-4 border-b border-blue-gray-50 md:text-sm sm:text-xs dark:text-white";

const Storage = 'http://localhost:8000/storage/';

const deleteBrand = (brand) => {
    if (!window.confirm('Are you sure you want to delete Brand: ' + brand.name + ' ? \n This action will delete permanently all related Products.')) {
        return
    }
    router.delete(route('brands.destroy', brand.id));
}


export default function Index({ auth, brands, success }) {

    const [showElement, setShowElement] = React.useState(true);

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Brands</h2>}
        >
            <Head title="Brands" />

            <div className="row-start-1 md:ml-2">
                <Link
                    href={route('brands.create')}
                >
                    <button type="button" className="focus:outline-none text-white 
                bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 
                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >Create new?</button>
                </Link>

                {
                    success && (showElement ? (
                        <div id="successAlert" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <InformationCircleIcon className="size-5" />
                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button
                                type="button"
                                className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg 
                                focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex 
                                items-center justify-center h-8 w-8 dark:bg-gray-800 
                                dark:text-green-400 dark:hover:bg-gray-700"
                                aria-label="Close"
                                data-dismiss-target="#successAlert"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    ) : null)
                }
            </div>

            <div className="w-5/6">

                <div className="row-start-1 md:ml-2">
                    <table className="table-fixed w-full text-left overflow-scroll">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 p-4 md:text-sm sm:text-xs"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center w-32 bg-gray-200 md:text-sm sm:text-xs"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.data.map((brand) => {
                                return (
                                    <tr key={brand.id}>
                                        <td className={classes}>
                                            {brand.id}
                                        </td>
                                        <td className={classes}>
                                            {brand.name}
                                        </td>
                                        <td className={classes}>
                                            <img className="rounded-full w-24" src={Storage + brand.logo} />
                                        </td>
                                        <td className={classes}>
                                            {brand.categories.map((cat) => {
                                                return (
                                                    <Link
                                                        key={cat.id}
                                                        className="dark:text-white"
                                                        href={route('categories.edit', cat.id)}
                                                    >
                                                        <span className="p-2" key={cat.id}>
                                                            {cat.name}
                                                        </span>
                                                    </Link>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                <Link
                                                    href={route('brands.show', brand.id)}
                                                >
                                                    <EyeIcon className="mx-2 size-6 text-gray-500" title="Show" />
                                                </Link>
                                                <Link
                                                    href={route('brands.edit', brand.id)}
                                                >
                                                    <ClipboardDocumentCheckIcon className="size-6 text-blue-500" title="Edit" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-700"
                                                    onClick={(e) => deleteBrand(brand)}
                                                >
                                                    <TrashIcon className="mx-2 size-6 text-red-500" title="Delete" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination links={brands.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}