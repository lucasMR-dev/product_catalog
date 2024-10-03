import { Link } from "@inertiajs/react";

export default function CreateButton({ href }) {
    return (
        <Link
            href={href}
        >
            <button type="button" className="focus:outline-none text-white 
                    bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                    rounded-lg text-xs md:text-sm px-5 py-2.5 me-2 mb-2 
                    dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Create new?
            </button>
        </Link>
    )
}