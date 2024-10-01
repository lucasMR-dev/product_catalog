import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import { MoonIcon } from "@heroicons/react/24/outline";

const site = import.meta.env.VITE_APP_NAME;
const currentYear = new Date().getFullYear();

const classes = "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800";

export default function Welcome({ auth }) {
    const [darkMode, setDarkMode] = useState((localStorage.theme) === 'dark' ? true : false);

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

    return (
        <>
            <Head title="Welcome" />
            <div className="h-full bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <label className="fixed top-5 right-5 inline-flex items-center cursor-pointer">
                    <input id="darkToogle" type="checkbox" checked={darkMode} onChange={toogleDarkMode} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full 
                        peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                        dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                        after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <MoonIcon className="mx-2 size-6 text-gray-500 dark:text-gray-300" />
                </label>
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    <button type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white 
                    hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base 
                    font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 
                    dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 
                    dark:focus:ring-blue-800">
                        All categories
                    </button>
                    <button type="button" className={classes}>Shoes</button>
                    <button type="button" className={classes}>Bags</button>
                    <button type="button" className={classes}>Electronics</button>
                    <button type="button" className={classes}>Gaming</button>
                </div>
                <div className="w-4/5 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <footer className="bg-white dark:bg-gray-900 mt-2">
                    <div className="mx-auto p-2 md:py-8">
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © {currentYear} <a href="/" className="hover:underline">{site}™</a>. All Rights Reserved.
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}
