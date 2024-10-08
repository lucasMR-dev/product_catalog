import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from "react";
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '@/Constants';
import ActionsDiv from '@/Components/ActionsDiv';

const TABLE_HEAD = ["#ID", "Name", "Created By", "Updated By",];

const classes = Constants.classes;

export default function Index({ auth, categories, options }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="lg:w-5/6">

                <div className="row-start-1">
                    <AlertDiv options={options} path={route('categories.create')} />
                </div>

                <div className="row-start-2 md:ml-2">
                    <table className="table-auto w-full text-center overflow-scroll dark:bg-gray-800">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 text-nowrap p-2 lg:p-4 text-xs md:text-sm dark:bg-gray-500 dark:text-white"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center bg-gray-200 text-xs md:text-sm dark:bg-gray-500 dark:text-white"
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
                                            {category.createdBy.name}
                                        </td>
                                        <td className={classes}>
                                            {category.updatedBy.name}
                                        </td>
                                        <td>
                                            <ActionsDiv href={{ show: 'categories.show', edit: 'categories.edit' }} resource={category} type="category" />
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