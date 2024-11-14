// Storage
export const Storage = 'http://localhost:8000/storage/';

// Sidebar
export const ResponsiveNavLinkClasses = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full";
export const SidebarIconClasses = "size-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";


// Forms Const
export const classes = "format text-xs border-b border-blue-gray-50 md:p-4 md:text-sm lg:text-md dark:text-white";
export const inputCSS = "block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
export const labelCSS = "peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";


// Frontend
export const gridClasses = "cursor-pointer text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 [&.active]:bg-blue-400";
export const filterClasses = "self-center cursor-pointer text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2";
export const sortBy = [
    { name: 'Name: A-Z', order: 'ASC' },
    { name: 'Price: Low to High', order: 'ASC' },
    { name: 'Price: High to Low', order: 'DESC' },
];

export const pagination = [
    { name: '3' },
    { name: '5' },
    { name: '10' },
    { name: '20' },
];