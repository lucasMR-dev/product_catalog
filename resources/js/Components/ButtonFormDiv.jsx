import { Link } from "@inertiajs/react";
import { memo } from "react";

const ButtonFormDiv = memo(({ display = '', href = '' }) => {
    return (
        <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 
        focus:outline-none focus:ring-green-300 font-medium 
        rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center 
        dark:bg-green-600 dark:hover:bg-green-700 
        dark:focus:ring-green-800 mb-2">
                {display}
            </button>
            <button type="button" className="text-gray-400 bg-white hover:bg-gray-100 focus:outline-none 
        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 
        px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 w-full md:w-auto
        dark:focus:ring-gray-700 dark:border-gray-700 mb-2 ml-2 dark:text-white">
                <Link href={route(href)}>
                    Cancel
                </Link>
            </button>
        </div>
    )
});
export default ButtonFormDiv;