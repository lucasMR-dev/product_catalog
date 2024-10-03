import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { NumericFormat } from 'react-number-format';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '../../Constants';
import ActionsDiv from '@/Components/ActionsDiv';

const TABLE_HEAD = ["#ID", "Name", "Images", "Description", "Brand", "Price", "Stock", "Categories"];
const classes = Constants.classes;

export default function Index({ auth, options, products }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products</h2>}
        >
            <Head title="Products" />
            <div className="lg:w-11/12">
                {/* Alert Div  */}
                <div className="row-start-1">
                    <AlertDiv options={options} path={route('products.create')} />
                </div>
                {/* Table */}
                <div className="row-start-2 relative overflow-x-auto">
                    <table className="table-auto w-full text-center lg:text-left overflow-scroll">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="format bg-gray-200 p-4 md:text-sm text-xs"
                                    >
                                        {head}
                                    </th>
                                ))}
                                <th
                                    key="Actions"
                                    className="format text-center bg-gray-200 md:text-sm text-xs"
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
                                                        <img key={img.image_path} className="md:w-24 md:h-24 rounded-full" src={Constants.Storage + img.image_path} />
                                                    )
                                                })
                                            }
                                        </td>
                                        <td className={classes}>
                                            <div className="truncate" dangerouslySetInnerHTML={{ __html: product.description }} />
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
                                                            className="format text-xs md:text-sm dark:text-white"
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
                                            <ActionsDiv href={{ show: "products.show", edit: "products.edit" }} resource={product} type="product" />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination links={products.meta.links} />
            </div>
        </AuthenticatedLayout>
    )
}