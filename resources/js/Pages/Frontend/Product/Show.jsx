import { Head, Link, router } from "@inertiajs/react";
import { NumericFormat } from "react-number-format";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import * as Constants from '@/Constants';
import MainLayout from "@/Layouts/MainLayout";

export default function Show({ product, searchParams }) {
    const images = JSON.parse(product.images);
    const description = { __html: product.description };
    const productOptions = JSON.parse(product.optionsAvailable);

    const addToCart = (product) => {
        const data = { id: product.id, name: product.name, quantity: 1, img: images[0].image_path }
        let currentCart = JSON.parse(sessionStorage.getItem('cart'));
        let filter = currentCart.filter(item => item.id == data.id);
        if (filter.length > 0) {
            currentCart.quantity = data.quantity;
        }
        else {
            currentCart.push(data);
        }
        sessionStorage.cart = JSON.stringify(currentCart);
        window.dispatchEvent(new StorageEvent("storage"));
    }

    return (
        <MainLayout
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
                            {product.categories && product.categories.map((cat) => {
                                return (
                                    <Link
                                        key={cat.id}
                                        className="format text-xs md:text-sm dark:text-white"
                                        href={route('catalog.index', { category: cat.name })}
                                    >
                                        <li key={cat.id} className="bg-gray-200 text-gray-800 text-xs 
                                                font-medium me-2 px-2.5 py-0.5 rounded-full 
                                                dark:bg-gray-700 dark:text-gray-300">
                                            {cat.name}
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                        <ul className="list-none">
                            {productOptions && productOptions.length > 0 ? productOptions.map((items, index) => {
                                return (
                                    <li key={index} className="format text-xs md:text-sm dark:text-white">
                                        <span>{items.name.toUpperCase()}: </span>
                                        {items.options.map((element, index) => {
                                            return (
                                                <span key={index}
                                                    className="bg-gray-200 text-gray-800 text-xs 
                                                font-medium me-2 px-2.5 py-0.5 rounded-full 
                                                dark:bg-gray-700 dark:text-gray-300">
                                                    {element}
                                                </span>
                                            )
                                        })}
                                    </li>
                                )
                            }) : null}
                        </ul>
                    </div>
                </div>
                <hr className="m-2" />
                <div className="flex justify-end m-2">
                    <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                            focus:outline-none focus:ring-green-300 font-medium 
                            rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center 
                            dark:bg-green-600 dark:hover:bg-green-700 
                            dark:focus:ring-green-800 mb-2"
                            onClick={() => addToCart(product)}
                        >
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