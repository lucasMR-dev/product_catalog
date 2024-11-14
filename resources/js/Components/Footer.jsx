import { memo } from "react";
const Footer = memo(() => {
    const site = import.meta.env.VITE_APP_NAME;
    const currentYear = new Date().getFullYear();

    return (

        <footer className="grid items-center bg-slate-200 bottom-0 left-0 z-20 w-full p-2 border-t 
            md:flex md:items-center md:justify-between md:p-4 dark:bg-gray-800 
            dark:border-gray-600"
        >
            <div className="text-center">
                <span className="text-sm text-gray-500">© {currentYear}
                    <a href="/" className="hover:underline">{site}™</a>
                    . All Rights Reserved.
                </span>
            </div>
            <ul className="hidden md:flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0 ">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    )
});
export default Footer;