import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '../../Constants';
import ActionsDiv from '@/Components/ActionsDiv';

const TABLE_HEAD = ["#ID", "Name", "Logo", "Categories"];
const classes = Constants.classes;

export default function Index({ auth, brands, options }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Brands</h2>}
        >
            <Head title="Brands" />

            <div className="lg:w-5/6">
                {/* Div Alert */}
                <div className="row-start-1">
                    <AlertDiv options={options} path={route('brands.create')} />
                </div>
                {/* Table */}
                <div className="row-start-2 relative overflow-x-auto">
                    <table className="table-auto w-full text-center md:text-left overflow-scroll">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 text-nowrap p-2 lg:p-4 text-xs md:text-sm"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center bg-gray-200 text-xs md:text-sm"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.data.map((brand) => {
                                return (
                                    <tr key={brand.id}>
                                        <td className={classes + ""}>
                                            {brand.id}
                                        </td>
                                        <td className={classes}>
                                            {brand.name}
                                        </td>
                                        <td className={classes}>
                                            <img className="rounded-full w-12 md:w-24" src={Constants.Storage + brand.logo} />
                                        </td>
                                        <td className={classes}>
                                            <ul className="list-none">
                                                {brand.categories.map((cat) => {
                                                    return (
                                                        <Link
                                                            key={cat.id}
                                                            className="dark:text-white"
                                                            href={route('categories.show', cat.id)}
                                                        >
                                                            <li key={cat.id}> {cat.name}</li>
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <ActionsDiv href={{ show: "brands.show", edit: "brands.edit" }} resource={brand} type="brand" />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination links={brands.meta.links} />
            </div>
        </AuthenticatedLayout>
    )
}