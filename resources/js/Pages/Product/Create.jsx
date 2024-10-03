import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useQuill } from 'react-quilljs';
import { useEffect } from "react";
import Select from 'react-select';
import * as Constants from '../../Constants';

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Create({ auth, categoryList, brandList }) {
    const { quill, quillRef } = useQuill();
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        images: [],
        brand_id: '',
        categories: [],
        stock: 0,
        price: 0,
    });

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setData('description', quill.root.innerHTML);
            });

        }
    }, [quill, data]);

    const options = [];
    categoryList.map((cat) => {
        options.push({ value: cat.id, label: cat.name });
    });

    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        setData('images', files);
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
        post(route('products.store'));
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
                    <div className="h-60">
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
                        >
                            <option defaultValue="">Existing Brands</option>
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
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="images_help" id="images" type="file" accept="image/*"
                            onChange={(e) => handleImages(e)}
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
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Categories"
                            onChange={(e) => handleChange(e)}
                        />
                    }
                    <InputError message={errors.categories} />
                </div>
                <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                    focus:outline-none focus:ring-green-300 font-medium 
                    rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center 
                    dark:bg-green-600 dark:hover:bg-green-700 
                    dark:focus:ring-green-800 mb-2">
                        Create
                    </button>
                    <button type="button" className="text-gray-400 bg-white hover:bg-gray-100 focus:outline-none 
                    focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 
                    px-5 py-2.5 me-2 mb-2 w-full md:w-auto dark:bg-gray-800 dark:hover:bg-gray-700 
                    dark:focus:ring-gray-700 dark:border-gray-700 mb-2 ml-2">
                        <Link href={route('products.index')}>
                            Cancel
                        </Link>
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    )
}