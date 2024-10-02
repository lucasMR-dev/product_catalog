import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ClipboardDocumentCheckIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '../../Constants';

const TABLE_HEAD = ["ID", "Name", "Images", "Description", "Brand", "Price", "Stock", "Categories"];
const classes = Constants.classes;

const deleteProduct = (product) => {
    if (!window.confirm('Are you sure you want to delete Product: ' + product.name + ' ?')) {
        return
    }
    router.delete(route('products.destroy', product.id));
}

export default function Index({ auth, options, products }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products</h2>}
        >
            <Head title="Products" />
            <div className="w-5/6">
                {/* Alert Div  */}
                <div className="row-start-1">
                    <AlertDiv options={options} path={route('products.create')} />
                </div>
                {/* Table */}
                <div className="row-start-2 md:ml-2">
                    <table className="table-fixed w-full text-left overflow-scroll">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    head == 'Categories' ? <th
                                        key={head}
                                        className="format bg-gray-200 p-4 text-center md:text-sm sm:text-xs"
                                    >
                                        {head}
                                    </th> : <th
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
                            {products.data.map((product) => {
                                const images = JSON.parse(product.images);
                                return (
                                    <tr key={product.id}>
                                        <td className={classes}>
                                            {product.id}
                                        </td>
                                        <td className={classes}>
                                            {product.name}
                                        </td>
                                        <td className={classes}>
                                            {
                                                images.slice(0, 2).map((img) => {
                                                    return (
                                                        <img key={img.image_path} className="w-24 h-24 rounded-full" src={Constants.Storage + img.image_path} />
                                                    )
                                                })
                                            }
                                        </td>
                                        <td className={classes}>
                                            <div className="truncate hover:text-clip" dangerouslySetInnerHTML={{__html:  product.description}} />
                                        </td>
                                        <td className={classes}>
                                            {
                                                product.brand && (
                                                    <Link
                                                        key={product.brand.id}
                                                        className="text-white"
                                                        href={route('brands.show', product.brand.id)}
                                                    >
                                                        <img className="rounded-full" src={Constants.Storage + product.brand.logo} />
                                                    </Link>
                                                )
                                            }
                                        </td>
                                        <td className={classes}>
                                            <NumericFormat
                                                value={product.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                        </td>
                                        <td className={classes}>
                                            {product.stock}
                                        </td>
                                        <td className={classes}>
                                            <ul className="list-none">
                                                {product.categories.map((cat) => {
                                                    return (
                                                        <Link
                                                            key={cat.id}
                                                            className="format dark:text-white"
                                                            href={route('categories.show', cat.id)}
                                                        >
                                                            <li key={cat.id}>
                                                                {cat.name}
                                                            </li>
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                <Link
                                                    href={route('products.show', product.id)}
                                                >
                                                    <EyeIcon className="mx-2 size-6 text-gray-500" title="Show" />
                                                </Link>
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                >
                                                    <ClipboardDocumentCheckIcon className="size-6 text-blue-500" title="Edit" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-red-700"
                                                    onClick={(e) => deleteProduct(product)}
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
                    <Pagination links={products.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}