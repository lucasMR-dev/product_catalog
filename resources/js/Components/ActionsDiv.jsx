import { ClipboardDocumentCheckIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function ActionsDiv({ href, resource, type }) {

    const handleAlert = (resource, type) => {
        if (type === 'category') {
            if (!window.confirm('Are you sure you want to delete Category: ' + resource.name + ' ? \n This action will delete permanently all related Brands and Products.')) {
                return
            }
            router.delete(route('categories.destroy', resource.id));
        }
        else if (type === 'brand') {
            if (!window.confirm('Are you sure you want to delete Brand: ' + resource.name + ' ? \n This action will delete permanently all related Products.')) {
                return
            }
            router.delete(route('brands.destroy', resource.id));
        }
        else if (type === 'product') {
            if (!window.confirm('Are you sure you want to delete Product: ' + resource.name + ' ?')) {
                return
            }
            router.delete(route('products.destroy', resource.id));
        }
    }

    return (
        <div className="flex justify-center">
            {/* <Link
                href={route(href.show, resource.id)}
            >
                <EyeIcon className="mx-2 size-5 lg:size-7 text-gray-500" title="Show" />
            </Link> */}
            <Link
                href={route(href.edit, resource.id)}
            >
                <ClipboardDocumentCheckIcon className="size-5 lg:size-7 text-blue-500" title="Edit" />
            </Link>
            <button
                type="button"
                className="text-red-700"
                onClick={(e) => handleAlert(resource, type)}
            >
                <TrashIcon className="mx-2 size-5 lg:size-7 text-red-500" title="Delete" />
            </button>
        </div>
    )
}