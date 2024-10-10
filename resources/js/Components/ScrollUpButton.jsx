import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const scrollStyle = "sticky float-right right-4 bottom-2 focus:outline-none rounded-lg cursor-pointer dark:text-white";

export default function ScrollUpButton() {
    const [ShowButton, setShowButton] = useState(false);

    const isVisible = () => {
        setShowButton(window.scrollY > 50);
    }

    const goUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        window.addEventListener('scroll', isVisible);
    }, []);

    return (
        <div className={ShowButton ? scrollStyle : 'hidden'}>
            <span
                className="inline-flex items-center justify-center w-10 
                h-10 me-2 text-sm font-semibold text-gray-800 
                bg-gray-200 rounded-full dark:bg-gray-700 
                dark:text-gray-300">
                <ArrowUpIcon
                    fill="none" className="size-7"
                    stroke="currentColor" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="2"
                    onClick={goUp}
                />
            </span>
        </div>
    )
}