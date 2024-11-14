import { ClipboardDocumentCheckIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import { memo } from "react";

const ActionsDiv = memo(({ resource, type }) => {
    const handleAlert = (resource, type) => {
        if (!window.confirm('You want to delete permanently: "' + resource.name + '" from ' + type.toUpperCase() + ' ?')) {
            return
        }
        router.delete(route(type + '.destroy', resource.id));
    }

    return (
        <div className="flex justify-center">
            {/* <Link
                href={route(href.show, resource.id)}
            >
                <EyeIcon className="mx-2 size-5 lg:size-7 text-gray-500" title="Show" />
            </Link> */}
            <Link
                href={route(type + ".edit", resource.id)}
            >
                <ClipboardDocumentCheckIcon className="size-5 lg:size-7 text-blue-500" title="Edit" />
            </Link>
            <button
                type="button"
                className="text-red-700"
                onClick={() => handleAlert(resource, type)}
            >
                <TrashIcon className="mx-2 size-5 lg:size-7 text-red-500" title="Delete" />
            </button>
        </div>
    )
});
export default ActionsDiv;