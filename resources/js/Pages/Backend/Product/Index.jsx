import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { NumericFormat } from 'react-number-format';
import AlertDiv from '@/Components/AlertDiv';
import * as Constants from '@/Constants';
import ActionsDiv from '@/Components/ActionsDiv';

const TABLE_HEAD = ["SKU", "Name", "Images", "Brand", "Price", "Stock", "Categories", "Options Available"];
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
                                        className="format text-nowrap bg-gray-200 p-4 md:text-sm text-xs"
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
                                const productOptions = JSON.parse(product.optionsAvailable);
                                return (
                                    <tr key={product.sku}>
                                        <td className={classes + " text-gray-700"}>
                                            {product.sku}
                                        </td>
                                        <td className={classes}>
                                            {product.name.slice(0, 45) + "..."}
                                        </td>
                                        <td className={classes}>
                                            {
                                                images.slice(0, 1).map((img) => {
                                                    return (
                                                        <img key={img.image_path}
                                                            className="md:w-24 md:h-24"
                                                            src={Constants.Storage + img.image_path}
                                                        />
                                                    )
                                                })
                                            }
                                        </td>
                                        <td className={classes}>
                                            {
                                                product.brand && (
                                                    <span className="format text-xs md:text-sm dark:text-white">
                                                        {product.brand.name}
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td className={classes}>
                                            <NumericFormat
                                                value={product.price}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'$'}
                                            />
                                        </td>
                                        <td
                                            className={
                                                product?.stock <= 5 ? classes + " text-red-500"
                                                    : product?.stock > 5 && product?.stock <= 10 ? classes + " text-amber-500"
                                                        : classes + " text-green-500"}>
                                            {product.stock}
                                        </td>
                                        <td className={classes}>
                                            <ul className="list-none">
                                                {product.categories.map((cat) => {
                                                    return (
                                                        <li
                                                            key={cat.id}
                                                            className="format text-xs md:text-sm dark:text-white">
                                                            {cat.name}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </td>
                                        <td className={classes}>
                                            <ul className="list-none">
                                                {productOptions && productOptions.length > 0 ? productOptions.map((items, index) => {
                                                    return (
                                                        <li key={index} className="format text-xs md:text-sm dark:text-white">
                                                            <span>{items.name.toUpperCase()}: </span>
                                                            {items.options.map((element, index) => {
                                                                return (
                                                                    <span key={index} className="bg-gray-200 text-gray-800 text-xs 
                                                                        font-medium me-2 px-2.5 py-0.5 rounded-full 
                                                                        dark:bg-gray-700 dark:text-gray-300">
                                                                        {element}
                                                                    </span>
                                                                )
                                                            })}
                                                        </li>
                                                    )
                                                }) : null}
                                            </ul>
                                        </td>
                                        <td>
                                            <ActionsDiv resource={product} type="products" />
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