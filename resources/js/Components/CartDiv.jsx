import TextInput from './TextInput';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowsPointingInIcon, XMarkIcon } from '@heroicons/react/24/outline';
import * as Constants from '@/Constants';

export default function CartDiv({ openCart, cart, modifyCart }) {
    const [currentCart, updateCart] = useState(cart);
    const storageEventHandler = () => {
        updateCart(JSON.parse(sessionStorage.getItem('cart')));
    }
    useEffect(() => {
        sessionStorage.cart = JSON.stringify(currentCart);
        modifyCart(currentCart);
        window.addEventListener('storage', storageEventHandler, false);
    }, [currentCart, modifyCart, storageEventHandler])

    const qtyModify = (item, value) => {
        const product = { id: item.id, name: item.name, quantity: Number(value), img: item.img };
        const updatedQty = currentCart.map(prod => prod.id == item.id ? { ...currentCart, ...product } : prod);
        updateCart(updatedQty);
    }

    const deleteProduct = (id) => {
        const leftProducts = currentCart.filter(item => item.id !== id);
        updateCart(leftProducts);
    }

    return (
        <form>
            <div className="relative dark:text-white mb-4">
                <h1>Cart Resume</h1>
                <ArrowsPointingInIcon
                    className="absolute size-6 top-0 right-5 hover:cursor-pointer 
                    justify-end text-gray-500 dark:text-white"
                    onClick={() => openCart(false)}
                />
            </div>
            <hr className="bg-gray-200 dark:bg-gray-400 mb-2" />

            {currentCart.map((item, index) => {
                return (
                    <div key={index} className="grid grid-rows-1 grid-flow-col m-2">
                        <div>
                            <img className="w-20" src={Constants.Storage + item.img} />
                        </div>
                        <div className="flex col-span-1 self-center">
                            <TextInput
                                id="qty"
                                className="format h-12 text-center mr-4"
                                type='number'
                                min={1}
                                value={item.quantity}
                                onChange={(e) => qtyModify(item, e.target.value)}
                            />
                            <XMarkIcon
                                className="absolute right-0 self-center mr-2 
                                size-5 text-gray-500 dark:text-white"
                                onClick={() => deleteProduct(item.id)}
                            />
                        </div>
                    </div>
                )
            })}
            <div className="flex justify-end mt-3">
                <Link className="mr-3" href={route('cart')}>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
                        dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg 
                        dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                        text-center me-2 mb-2">View Cart</button>
                </Link>
            </div>
        </form>
    )
}