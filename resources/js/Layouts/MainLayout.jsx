import ApplicationLogo from '@/Components/ApplicationLogo';
import ScrollUpButton from '@/Components/ScrollUpButton';
import { MagnifyingGlassIcon, MoonIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const site = import.meta.env.VITE_APP_NAME;
const currentYear = new Date().getFullYear();

export default function MainLayout({ header, searchParams, children }) {
    searchParams = searchParams || {};
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

    const reset = () => {
        searchFilter('name', document.getElementById('default-search').value = '');
    }

    return (
        <div className="min-h-screen bg-white flex-col items-center pt-6 sm:justify-center sm:pt-0 dark:bg-gray-800">
            {/** Sticky Header */}
            {header && (
                <header className="w-full top-0 lg:p-10 lg:sticky bg-white dark:bg-gray-800">
                    <div className="flex justify-between">
                        <div className="hidden lg:block mx-auto self-center">
                            <Link href={route('catalog.index')}>
                                <ApplicationLogo className="h-12 w-12 mx-auto fill-current dark:text-gray-200" />
                                {header}
                            </Link>
                        </div>
                        {/** Search Field */}
                        <div className="w-4/5">
                            <div className="relative mt-2 flex flex-wrap">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MagnifyingGlassIcon className="mx-2 size-4 text-gray-500 dark:text-gray-300" />
                                </div>
                                <input id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                                rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Product name or description..."
                                    defaultValue={searchParams ? searchParams.name : ''}
                                    onBlur={(e) => searchFilter("name", e.target.value)}
                                    onKeyDown={(e) => searchEnter("name", e)}
                                />
                                <span className={searchParams.name ? "absolute self-center mr-2 right-0" : "hidden"}>
                                    <XMarkIcon className="size-5 text-gray-500 dark:text-gray-100"
                                        onClick={() => reset()}
                                    />
                                </span>
                            </div>
                        </div>
                        {/** Theme Toggle */}
                        <div className="flex self-center mx-auto">
                            <ShoppingCartIcon className="mr-5 size-7 md:size-7 text-gray-400 dark:text-gray-300" />
                            <label className="mx-2 lg:right-5 inline-flex items-center cursor-pointer">
                                <input id="darkToogle" type="checkbox" checked={darkMode} onChange={toogleDarkMode} className="sr-only peer" />
                                <MoonIcon className="size-6 text-gray-500 dark:text-gray-300" />
                            </label>
                        </div>
                    </div>
                </header>
            )}
            {/** Main Div */}
            <main>
                {children}
                <ScrollUpButton />
            </main>
            {/** Footer */}
            <footer className="w-full dark:bg-gray-800">
                <div className="mx-auto p-2 md:py-8">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {currentYear} <a href="/" className="hover:underline">{site}™</a>. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}