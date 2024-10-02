import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from "react";
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ClipboardDocumentCheckIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '../../Constants';

const TABLE_HEAD = ["ID", "Name", "Created By", "Updated By",];

const classes = Constants.classes;

const deleteCategory = (category) => {
    if (!window.confirm('Are you sure you want to delete Category: ' + category.name + ' ? \n This action will delete permanently all related Brands and Products.')) {
        return
    }
    router.delete(route('categories.destroy', category.id));
}

export default function Index({ auth, categories, options }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="w-5/6">

                <div className="row-start-1">
                    <AlertDiv options={options} path={route('categories.create')} />
                </div>

                <div className="row-start-2 md:ml-2">
                    <table className="table-fixed w-full text-left overflow-scroll dark:bg-gray-800">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 p-4 md:text-sm sm:text-xs dark:bg-gray-500 dark:text-white"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center bg-gray-200 md:text-sm sm:text-xs dark:bg-gray-500 dark:text-white w-32"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.data.map((category) => {

                                return (
                                    <tr key={category.id}>
                                        <td className={classes}>
                                            {category.id}
                                        </td>
                                        <td className={classes}>
                                            {category.name}
                                        </td>
                                        <td className={classes}>
                                            {category.createdBy.name}<br /> {category.createdBy.email}
                                        </td>
                                        <td className={classes}>
                                            {category.updatedBy.name}<br /> {category.updatedBy.email}
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                <Link
                                                    href={route('categories.show', category.id)}
                                                >
                                                    <EyeIcon className="mx-2 size-6 text-gray-500" title="Show" />
                                                </Link>
                                                <Link
                                                    href={route('categories.edit', category.id)}
                                                >
                                                    <ClipboardDocumentCheckIcon className="size-6 text-blue-500" title="Edit" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-700"
                                                    onClick={(e) => deleteCategory(category)}
                                                >
                                                    <TrashIcon className="mx-2 size-6 text-red-500" title="Delete" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination links={categories.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}