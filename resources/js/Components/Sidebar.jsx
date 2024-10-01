import { BuildingOfficeIcon, PresentationChartBarIcon, RectangleStackIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import ResponsiveNavLink from './ResponsiveNavLink';

export default function Sidebar() {

    return (
        <aside className="relative z-40 transition-transform -translate-x-full sm:translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 bg-slate-50">
                <ul className="space-y-2 font-medium">
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-gray-900 rounded-lg 
                                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                                    group w-full"
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <PresentationChartBarIcon className="size-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-gray-900 rounded-lg 
                                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                                    group w-full"
                            href={route('products.index')}
                            active={route().current('products.index')}
                        >
                            <ShoppingBagIcon className="size-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-gray-900 rounded-lg 
                                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                                    group w-full"
                            href={route('brands.index')}
                            active={route().current('brands.index')}
                        >
                            <BuildingOfficeIcon className="size-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Brands</span>
                        </ResponsiveNavLink>
                    </li><li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-gray-900 rounded-lg 
                                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                                    group w-full"
                            href={route('categories.index')}
                            active={route().current('categories.index')}
                        >
                            <RectangleStackIcon className="size-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
                        </ResponsiveNavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}