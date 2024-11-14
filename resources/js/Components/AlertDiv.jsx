import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateButton from "./CreateButton";
import { memo } from "react";

const AlertDiv = memo(({ options, path }) => {
    let divStyle;
    switch (options?.action) {
        case 'delete':
            divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-red-500 dark:text-red-400 ";
            break;
        case 'update':
            divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-blue-500 dark:text-blue-400";
            break;
        default:
            divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-green-500 dark:text-green-400";
            break;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <div>
                <CreateButton href={path} />
            </div>
            <div className="col-span-2">
                {
                    options && (
                        <div id="successAlert" className={divStyle} role="alert">
                            <div className="flex">
                                <InformationCircleIcon className="size-5" />
                                <span className="sr-only">Info</span>
                                <div className="ms-3 text-sm font-medium">
                                    {options.message}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
});
export default AlertDiv;