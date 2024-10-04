import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useQuill } from 'react-quilljs';
import { useEffect, useState } from "react";
import Select from 'react-select';
import * as Constants from '../../Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Edit({ auth, product, categoryList, brandList }) {
    const { quill, quillRef } = useQuill();
    const [showDiv, setShowDiv] = useState(true);
    const initial = [];
    product.categories.map((cat) => {
        initial.push(cat.id);
    });
    const { data, setData, post, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        images: [],
        brand_id: product.brand.id || '',
        categories: initial || [],
        price: Number(product.price.replace(/[^0-9\.]+/g, "")) || 0,
        stock: product.stock || 0,
        _method: 'PUT'
    });

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(product.description);
            quill.on('text-change', () => {
                setData('description', quill.root.innerHTML);
            });
        }
    }, [quill]);

    const options = [];
    categoryList.map((cat) => {
        options.push({ value: cat.id, label: cat.name });
    });
    const currentCategories = [];
    product.categories.map((cat) => {
        currentCategories.push({ id: cat.id, value: cat.id, label: cat.name });
    });

    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        setData('images', files);
        setShowDiv(false);
    }

    const handleChange = (e) => {
        let formated = [];
        e.map((option) => {
            formated.push(option.value);
        });
        setData('categories', formated);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product</h2>}
        >
            <Head title="Product" />

            <form className="w-4/5 mt-5 mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="name" className={labelCSS}>Name</label>
                    <TextInput id="name" type="text" className={inputCSS} value={data.name} isFocused={true} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="description" className={labelCSS}>Description</label>
                    <div className="lg:h-60">
                        <div ref={quillRef} />
                    </div>
                    <InputError message={errors.description} />
                </div><br />
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="brand_id" className={labelCSS}>Brand</label>
                    {
                        <select
                            id="brand_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setData('brand_id', e.target.value)}
                            defaultValue={product.brand.id}
                        >
                            <option defaultValue="">Brands</option>
                            {brandList.map((brand) => {
                                return (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                )
                            })}
                        </select>
                    }
                    <InputError message={errors.brand} />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <div className="w-full">
                        <label htmlFor="images" className={labelCSS}>Images</label>
                        {showDiv && (
                            <div className="flex flex-wrap items-center my-6">
                                {
                                    JSON.parse(product.images).map((img) => {
                                        return (
                                            <img key={img.display_pos} src={Constants.Storage + img.image_path} className="px-3" alt="" />
                                        )
                                    })}
                            </div>
                        )}
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="images_help" id="images" type="file"
                            onChange={(e) => handleImages(e)}
                            accept="image/*"
                            multiple
                        />
                        <span className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="images_help">PNG, JPG or GIF (Max. Size 7MB).</span>
                        <InputError message={errors.images} />
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="price" className={labelCSS}>Price</label>
                    <TextInput id="price" type="number" className={inputCSS} value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    <InputError message={errors.price} />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="stock" className={labelCSS}>Stock</label>
                    <TextInput id="stock" type="number" className={inputCSS} value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                    <InputError message={errors.stock} />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="description" className={labelCSS}>Categories:</label>
                    {
                        <Select
                            isMulti
                            name="categories"
                            id="categories"
                            defaultValue={currentCategories}
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Categories"
                            onChange={(e) => handleChange(e)}
                        />
                    }
                    <InputError message={errors.categories} />
                </div>
                <ButtonFormDiv href="products.index" display="Update" />
            </form>
        </AuthenticatedLayout>
    )
}