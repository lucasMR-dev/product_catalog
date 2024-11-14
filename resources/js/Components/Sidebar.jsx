import { memo } from "react";
import { BuildingOfficeIcon, PresentationChartBarIcon, RectangleStackIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import ResponsiveNavLink from './ResponsiveNavLink';
import * as Constants from '@/Constants';

const Sidebar = memo(() => {
    return (
        <aside className="relative z-40 transition-transform -translate-x-full sm:translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 bg-slate-50">
                <ul className="space-y-2 font-medium">
                    <li>
                        <ResponsiveNavLink
                            className={Constants.ResponsiveNavLinkClasses}
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <PresentationChartBarIcon className={Constants.SidebarIconClasses} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className={Constants.ResponsiveNavLinkClasses}
                            href={route('products.index')}
                            active={route().current('products.index')}
                        >
                            <ShoppingBagIcon className={Constants.SidebarIconClasses} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className={Constants.ResponsiveNavLinkClasses}
                            href={route('brands.index')}
                            active={route().current('brands.index')}
                        >
                            <BuildingOfficeIcon className={Constants.SidebarIconClasses}/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Brands</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className={Constants.ResponsiveNavLinkClasses}
                            href={route('categories.index')}
                            active={route().current('categories.index')}
                        >
                            <RectangleStackIcon className={Constants.SidebarIconClasses} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
                        </ResponsiveNavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
});
export default Sidebar;