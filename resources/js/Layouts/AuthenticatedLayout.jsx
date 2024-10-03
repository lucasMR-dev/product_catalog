import React, { useState, useEffect } from "react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { MoonIcon } from "@heroicons/react/24/outline";
import * as Constants from '../constants';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
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
        <div>
            {header && (
                <header>
                    <nav className="bg-slate-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="shrink-0 flex items-center">
                                        <Link href="/">
                                            <ApplicationLogo className="block h-9 w-auto fill-current dark:text-gray-200" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="py-6 px-4">{header}</div>

                                <div className="hidden sm:flex sm:items-center sm:ms-6">

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input id="darkToogle" type="checkbox" checked={darkMode} onChange={toogleDarkMode} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
                                        dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full 
                                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                                        after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
                                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                                        after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <MoonIcon className="mx-2 size-6 text-gray-500 dark:text-gray-300" />
                                    </label>

                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <img className="rounded-full cursor-pointer object-cover h-14 w-14 mt-1"
                                                        src={Constants.Storage + user.image_profile}
                                                    />
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                                        dark:text-gray-500 hover:text-gray-500 
                                        dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 
                                        focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 
                                        focus:text-gray-500 dark:focus:text-gray-400 transition 
                                        duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('products.index')} active={route().current('products.index')}>
                                    Products
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('brands.index')} active={route().current('brands.index')}>
                                    Brands
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.index')}>
                                    Categories
                                </ResponsiveNavLink>
                            </div>


                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            )}

            <main>
                <div className="flex bg-slate-50 dark:bg-gray-800">
                    <div className="hidden md:block md:w-1/5">
                        <Sidebar />
                    </div>
                    <div className="w-full md:w-4/5 lg:w-4/5 mt-2 items-center lg:ms-6 bg-slate-50 dark:bg-gray-800">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div >
    );
}
