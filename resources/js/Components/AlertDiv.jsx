import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateButton from "./CreateButton";

export default function AlertDiv({ options, path }) {

    let divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-green-500 dark:text-green-400";
    if (options !== null) {
        if (options.action === 'delete') {
            divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-red-500 dark:text-red-400 ";
        } else if (options.action === 'update') {
            divStyle = "grid items-center md:justify-items-end p-4 mb-4 text-blue-500 dark:text-blue-400";
        }
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
}