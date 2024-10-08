import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ClipboardDocumentCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { NumericFormat } from "react-number-format";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import * as Constants from '@/Constants';

export default function Show({ auth, product }) {
    const images = JSON.parse(product.images);
    const description = { __html: product.description };
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product Details</h2>}
        >
            <Head title="Show Product" />

            <div className="lg:w-11/12 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="mt-5 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="dark:text-white" dangerouslySetInnerHTML={description} />
                    </div>
                    <hr className="m-2" />
                    <div className="grid grid-cols-2 md:flex md:items-center md:justify-between">
                        <div className="lg:items-center lg:justify-center dark:text-white">
                            <span className="format text-xs md:text-sm dark:text-white">
                                Price:&nbsp;
                                <NumericFormat
                                    value={product.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </span>
                        </div>
                        <div className="lg:items-center lg:justify-center dark:text-white">
                            <span className="format text-xs md:text-sm dark:text-white">Available in Stock: {product.stock}</span>
                        </div>
                        <div className="lg:flex lg:flex-wrap lg:items-center lg:justify-center">
                            <span className="format text-xs md:text-sm dark:text-white">
                                Brand:
                            </span>
                            <Link
                                key={product.brand.id}
                                className="dark:text-white"
                                href={route('brands.show', product.brand.id)}
                            >
                                <img className="rounded-full w-12 md:w-24" src={Constants.Storage + product.brand.logo} />
                            </Link>
                        </div>
                        <ul className="lg:flex lg:flex-wrap lg:items-center lg:justify-center text-gray-900 dark:text-white">
                            <span className="format text-xs md:text-sm dark:text-white">Categories:</span>&nbsp;
                            {product.categories.map((cat) => {
                                return (
                                    <Link
                                        key={cat.id}
                                        className="format text-xs md:text-sm dark:text-white"
                                        href={route('categories.show', cat.id)}
                                    >
                                        <li key={cat.id} className="p-2">
                                            {cat.name}
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <hr className="m-2" />
                <div className="items-center mx-auto w-4/5">
                    <PhotoProvider
                        maskOpacity={0.5}
                    >
                        <div className="flex flex-wrap items-center my-6">
                            {images.map((img, index) => (
                                <PhotoView key={index} src={Constants.Storage + img.image_path}>
                                    <img src={Constants.Storage + img.image_path} alt="" className="mr-2 mb-2 w-36 h-36 cursor-pointer object-cover" />
                                </PhotoView>
                            ))}
                        </div>
                    </PhotoProvider>
                </div>
                <hr className="m-2" />
                <div className="hidden lg:w-4/5 md:grid md:grid-cols-1 lg:flex lg:justify-between items-center mx-auto">
                    <div className="text-center lg:text-left">
                        <span className="format text-xs lg:text-sm dark:text-white">Created on: {Date(product.created_at)}</span> <br />
                        <span className="format text-xs lg:text-sm dark:text-white">By user: {product.createdBy.name} // {product.createdBy.email} </span>
                    </div>
                    <div className="text-center lg:text-left">
                        <span className="format text-xs lg:text-sm dark:text-white">Last updated on: {Date(product.updated_at)} </span><br />
                        <span className="format text-xs lg:text-sm dark:text-white">By user: {product.updatedBy.name} // {product.updatedBy.email} </span>
                    </div>
                </div>
                <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
                    <button
                        type="button"
                        className="dark:text-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
                        items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        <Link
                            href={route('products.edit', product.id)}
                        >
                            <ClipboardDocumentCheckIcon className="size-6 text-red-500" title="Edit" />
                        </Link>
                        &nbsp;Edit
                    </button>
                    <button
                        type="button"
                        className="dark:text-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
                        items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        onClick={() => window.history.back()}
                    >
                        <Link
                            href={route('products.edit', product.id)}
                        >
                            <XMarkIcon className="size-6 text-gray-500" title="Edit" />
                        </Link>
                        &nbsp;Cancel
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}