import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function AlertDiv({ options, path }) {

    let divStyle = `flex items-center p-4 mb-4 text-green-500 dark:text-green-400`;
    if (options !== null) {
        if (options.action === 'delete') {
            divStyle = "flex items-center p-4 mb-4 text-red-500 dark:text-red-400 ";
        } else if (options.action === 'update') {
            divStyle = "flex items-center p-4 mb-4 text-blue-500 dark:text-blue-400";
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <Link
                    href={path}
                >
                    <button type="button" className="focus:outline-none text-white 
                                bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                                font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 
                                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >Create new?
                    </button>
                </Link>
            </div>
            <div className="grid justify-items-end items-center">
                {
                    options && (
                        <div id="successAlert" className={divStyle} role="alert">
                            <InformationCircleIcon className="size-5" />
                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm font-medium">
                                {options.message}
                            </div>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}