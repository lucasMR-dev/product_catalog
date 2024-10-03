import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center">
            <div className="border-blue-gray-100 bg-blue-gray-50 p-2 dark:text-white">
                {links.map((link) => (
                    <Link
                        className={
                            "inline-block py-2 px-3 rounded-lg text-lightgray-500 text-xs md:text-sm " +
                            (link.active ? "bg-gray-300  dark:bg-gray-500" : " ") +
                            (!link.url ? "!text-gray-500 cursor-not-allowed " : " hover:br-gray-950")
                        }
                        preserveScroll
                        href={link.url || ""}
                        key={link.label}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    >
                    </Link>
                ))}
            </div>
        </nav>
    );
}