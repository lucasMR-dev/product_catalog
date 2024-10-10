import { Head, Link } from "@inertiajs/react";
import { NumericFormat } from "react-number-format";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import * as Constants from '@/Constants';
import MainLayout from "@/Layouts/MainLayout";

export default function Show({ product, searchParams }) {
    const images = JSON.parse(product.images);
    const description = { __html: product.description };
    return (
        <MainLayout
            cart={Constants.cart}
            searchParams={searchParams}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products Catalog</h2>}
        >
            <Head title={product.name} />
            <div className="lg:w-4/5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="px-5 pb-5">
                    <div className="items-center mx-auto w-4/5 ">
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
                    <h5 className="mt-5 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
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
                                href={route('catalog.index', { brand: product.brand.name })}
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
                                        href={route('catalog.index', { category: cat.name })}
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
                <div className="flex justify-end m-2">
                    <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                            focus:outline-none focus:ring-green-300 font-medium 
                            rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center 
                            dark:bg-green-600 dark:hover:bg-green-700 
                            dark:focus:ring-green-800 mb-2">
                            Add to Cart
                        </button>
                        <button type="button" className="text-gray-400 bg-white hover:bg-gray-100 focus:outline-none 
                            focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 
                            px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 w-full md:w-auto
                            dark:focus:ring-gray-700 dark:border-gray-700 mb-2 ml-2 dark:text-white">
                            <Link href={route('catalog.index')}>
                                Cancel
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}