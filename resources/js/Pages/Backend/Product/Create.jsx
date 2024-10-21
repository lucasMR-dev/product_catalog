import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useQuill } from 'react-quilljs';
import { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import * as Constants from '@/Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Create({ auth, categoryList, brandList }) {
    const { quill, quillRef } = useQuill();
    const selectOptionsRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [optionName, setOptionName] = useState([]);
    const [optionValues, setOptionValues] = useState([]);
    const [currentKey, setCurrentKey] = useState('');
    const { data, setData, post, errors } = useForm({
        sky: '',
        name: '',
        slug: '',
        description: '',
        images: [],
        brand_id: '',
        categories: [],
        stock: 0,
        price: 0,
        optionsAvailable: []
    });

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setData('description', quill.root.innerHTML);
            });
        }
    }, [quill, data, currentKey]);

    const brandOptions = [];
    const categoryOptions = [];

    brandList.map((brand) => {
        brandOptions.push({ label: brand.name, value: brand.id });
    })
    categoryList.map((cat) => {
        categoryOptions.push({ value: cat.id, label: cat.name });
    });

    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        setData('images', files);
    }

    const createOption = (e) => {
        let option = { label: e, value: e };
        let index = optionName.findIndex(item => item.label === e);
        if (index < 0) {
            setOptionName([...optionName, option]);
        }
        setCurrentKey(e);
    }

    const selectOption = (value, actionMeta) => {
        // On selected option Change
        if (actionMeta.action === 'select-option') {
            let key = data.optionsAvailable.find(item => item.name === value.value);
            if (key) {
                let arr = []
                key.options.forEach((option) => {
                    arr.push({ label: option, value: option });
                });
                setOptionValues(arr);
            }
            else {
                selectOptionsRef.current.clearValue();
            }
            setDisabled(false);
            setCurrentKey(value.value);
        }
        // On selected option Delete
        else {
            let filterKeys = optionName.filter(item => item.label !== actionMeta.removedValues[0].value);
            let filterData = data.optionsAvailable.filter(item => item.name !== actionMeta.removedValues[0].value);
            setOptionName(filterKeys);
            setData('optionsAvailable', filterData);
            selectOptionsRef.current.clearValue();
            setDisabled(true);
        }
    }

    const handleChange = (field, e) => {
        const formated = [];
        const current = data.optionsAvailable;
        e.map((option) => {
            formated.push(option.value);
        });
        if (field === 'categories') {
            setData('categories', formated);
        }
        else {
            const index = current.findIndex(item => item.name === currentKey);
            if (index < 0) {
                if (formated.length > 0) {
                    setData('optionsAvailable', [...current, { name: currentKey, options: formated }]);
                }
            }
            else {
                current[index].options = formated;
                setData('optionsAvailable', current);
            }
            setOptionValues(e);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    }

    const generateSlug = (name) => {
        let slug = name.replace(/[`~!¡@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
        slug = slug.replace(/^\s+|\s+$/gm, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        setData('slug', slug);
    }

    console.log(data)

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product</h2>}
        >
            <Head title={"Product " + data.name} />

            <form className="w-4/5 mt-5 mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="name" className={labelCSS}>Name</label>
                    <TextInput id="name" type="text" className={inputCSS}
                        value={data.name}
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        onBlur={(e) => generateSlug(e.target.value)} />
                    <InputError message={errors.name} />
                </div>
                <div className="flex mb-5">
                    <div className="inline-flex md:w-3/5 group">
                        <div>
                            <label htmlFor="sku" className={labelCSS}>sku</label>
                            <TextInput id="sku" type="text" className={inputCSS} value={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                            <InputError message={errors.sku} />
                        </div>
                        <div className="px-4">
                            <label htmlFor="price" className={labelCSS}>Price</label>
                            <TextInput id="price" type="number" className={inputCSS} value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.price} />
                        </div>
                        <div>
                            <label htmlFor="stock" className={labelCSS}>Stock</label>
                            <TextInput id="stock" type="number" className={inputCSS} value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                            <InputError message={errors.stock} />
                        </div>
                    </div>
                    <div className="md:w-2/5 group">
                        <label htmlFor="slug" className={labelCSS}>slug</label>
                        <TextInput id="slug" type="text" className={inputCSS + " bg-gray-400 hover:cursor-not-allowed"} value={data.slug} disabled={true} />
                        <InputError message={errors.slug} />
                    </div>
                </div>
                <div className="flex">
                    <div className="md:w-1/5 mb-5">
                        <label htmlFor="brand_id" className={labelCSS}>Brand</label>
                        {
                            <Select
                                name="brand_id"
                                id="brand_id"
                                options={brandOptions}
                                className="basic-multi-select bg-white relative"
                                classNamePrefix="select"
                                placeholder="Brands"
                                onChange={(e) => setData('brand_id', e.value)}
                            />
                        }
                        <InputError message={errors.brand} />
                    </div>
                    <div className="md:w-4/5 ml-3 mb-5">
                        <label htmlFor="categories" className={labelCSS}>Categories:</label>
                        {
                            <Select
                                isMulti
                                name="categories"
                                id="categories"
                                options={categoryOptions}
                                className="basic-multi-select bg-white relative"
                                classNamePrefix="select"
                                placeholder="Categories"
                                onChange={(e) => handleChange('categories', e)}
                            />
                        }
                        <InputError message={errors.categories} />
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="description" className={labelCSS}>Description</label>
                    <div className="h-60">
                        <div ref={quillRef} />
                    </div>
                    <InputError message={errors.description} />
                </div>
                <br />
                <div className="flex mt-4 mb-5 group">
                    <div className="md:w-1/2">
                        <label htmlFor="option" className={labelCSS}>Options Available:</label>
                        <CreatableSelect
                            isClearable
                            name="option"
                            id="option"
                            options={optionName}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Option Name"
                            onCreateOption={(e) => createOption(e)}
                            onChange={selectOption}
                        />

                        <CreatableSelect
                            ref={selectOptionsRef}
                            isDisabled={disabled}
                            isMulti
                            name="optionsValues"
                            id="optionsValues"
                            value={optionValues}
                            className="basic-multi-select mt-2 dark:bg-transparent"
                            classNamePrefix="select"
                            placeholder="Options Available"
                            onChange={(e) => handleChange('options', e)}
                        />
                        <InputError message={errors.optionsAvailable} />
                    </div>
                    <div className="md:w-1/2 px-4">
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
                <ButtonFormDiv href="products.index" display="Create" />
            </form>
        </AuthenticatedLayout>
    )
}