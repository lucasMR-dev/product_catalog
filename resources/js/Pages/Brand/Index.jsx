import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ClipboardDocumentCheckIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '../../Constants';

const TABLE_HEAD = ["ID", "Name", "Logo", "Categories"];
const classes = Constants.classes;

const deleteBrand = (brand) => {
    if (!window.confirm('Are you sure you want to delete Brand: ' + brand.name + ' ? \n This action will delete permanently all related Products.')) {
        return
    }
    router.delete(route('brands.destroy', brand.id));
}

export default function Index({ auth, brands, options }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Brands</h2>}
        >
            <Head title="Brands" />

            <div className="w-5/6">
                {/* Div Alert */}
                <div className="row-start-1">
                    <AlertDiv options={options} path={route('brands.create')} />
                </div>
                {/* Table */}
                <div className="row-start-2 md:ml-2">
                    <table className="table-fixed w-full text-left overflow-scroll">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 p-4 md:text-sm sm:text-xs"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center w-32 bg-gray-200 md:text-sm sm:text-xs"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.data.map((brand) => {
                                return (
                                    <tr key={brand.id}>
                                        <td className={classes}>
                                            {brand.id}
                                        </td>
                                        <td className={classes}>
                                            {brand.name}
                                        </td>
                                        <td className={classes}>
                                            <img className="rounded-full w-24" src={Constants.Storage + brand.logo} />
                                        </td>
                                        <td className={classes}>
                                            {brand.categories.map((cat) => {
                                                return (
                                                    <Link
                                                        key={cat.id}
                                                        className="dark:text-white"
                                                        href={route('categories.edit', cat.id)}
                                                    >
                                                        <span className="p-2" key={cat.id}>
                                                            {cat.name}
                                                        </span>
                                                    </Link>
                                                )
                                            })}
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                {/*<Link
                                                    href={route('brands.show', brand.id)}
                                                >
                                                    <EyeIcon className="mx-2 size-6 text-gray-500" title="Show" />
                                                </Link>*/}
                                                <Link
                                                    href={route('brands.edit', brand.id)}
                                                >
                                                    <ClipboardDocumentCheckIcon className="size-6 text-blue-500" title="Edit" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-700"
                                                    onClick={(e) => deleteBrand(brand)}
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
                    <Pagination links={brands.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}