import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useQuill } from 'react-quilljs';
import { useEffect, useState, useRef, useCallback, memo } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import * as Constants from '@/Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";
import { NumericFormat } from "react-number-format";
import DragInput from "@/Components/DragInput";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Edit({ auth, product, categories, brands }) {
    const options = JSON.parse(product.optionsAvailable);
    const keys = [];
    if (options) {
        options.map((items) => {
            keys.push({ label: items.name, value: items.name });
        });
    }
    const { quill, quillRef } = useQuill();
    const optionsNameRef = useRef(null);
    const selectOptionsRef = useRef(null);
    const categoriesRef = useRef(null);
    const [currentBrand, setCurrentBrand] = useState({ label: product.brand.name, value: product.brand.id } || []);
    const [disabled, setDisabled] = useState(true);
    const [optionName, setOptionName] = useState(keys || []);
    const [optionValues, setOptionValues] = useState([]);
    const [currentKey, setCurrentKey] = useState('');
    const productCategories = [];
    const brandOptions = [];
    const categoryOptions = [];
    const initial = [];
    product.categories.map((cat) => {
        initial.push(cat.id);
    });

    brands.data.map((brand) => {
        brandOptions.push({ label: brand.name, value: brand.id });
    });
    categories.data.map((cat) => {
        categoryOptions.push({ label: cat.name, value: cat.id });
    });

    product.categories.map((cat) => {
        productCategories.push({ label: cat.name, value: cat.id });
    });

    const { data, setData, post, errors } = useForm({
        sku: product.sku || '',
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        images: null,
        brand_id: product.brand.id || '',
        categories: initial || [],
        price: product.price,
        stock: product.stock || 0,
        optionsAvailable: options || [],
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

    const createOption = (e) => {
        let option = { label: e, value: e };
        let index = optionName.findIndex(item => item.label === e);
        if (index < 0) {
            setOptionName([...optionName, option]);
        }
        setCurrentKey(e);
    };

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
        const current = data?.optionsAvailable;
        e.length > 0 ? e.map((option) => {
            formated.push(option.value);
        }) : e;
        if (field === 'brand_id') {
            router.visit('/admin/products/' + product['id'] + '/edit', {
                method: 'get',
                data: { brand: e.value },
                only: ['categories'],
                preserveState: true,
                preserveScroll: true,
                onSuccess: (res) => {
                    const brand = res.url.split('=');
                    const selected = brandOptions.find(item => item.value == Number(brand[1]));
                    setCurrentBrand([selected]);
                    categoriesRef.current.clearValue();
                }
            });
            setData('brand_id', e.value);
        }
        else if (field === 'categories') {
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
        post(route('products.update', product.id));
    }

    const generateSlug = (name) => {
        let slug = name.replace(/[`~!¡™@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
        slug = slug.replace(/^\s+|\s+$/gm, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        setData('slug', slug);
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 
                dark:text-gray-200 leading-tight">
                    Product
                </h2>
            }
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
                            <TextInput id="sku" type="text"
                                className={inputCSS}
                                value={data.sku}
                                onChange={(e) => setData('sku', e.target.value)}
                            />
                            <InputError message={errors.sku} />
                        </div>
                        <div className="px-4">
                            <label htmlFor="price" className={labelCSS}>Price</label>
                            <NumericFormat
                                id="price"
                                className={inputCSS}
                                value={data.price}
                                displayType={'input'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'$'}
                                onValueChange={(values) => {
                                    setData('price', Number(values.value));
                                }}
                            />
                            <InputError message={errors.price} />
                        </div>
                        <div>
                            <label htmlFor="stock" className={labelCSS}>Stock</label>
                            <TextInput id="stock" type="number"
                                className={inputCSS}
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                            />
                            <InputError message={errors.stock} />
                        </div>
                    </div>
                    <div className="md:w-2/5 group">
                        <label htmlFor="slug" className={labelCSS}>slug</label>
                        <TextInput
                            id="slug"
                            type="text"
                            className={inputCSS + " bg-gray-400 hover:cursor-not-allowed"}
                            value={data.slug}
                            disabled={true}
                        />
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
                                defaultValue={currentBrand}
                                options={brandOptions}
                                className="basic-multi-select bg-white relative"
                                classNamePrefix="select"
                                placeholder="Brands"
                                onChange={(e) => handleChange('brand_id', e)}
                            />
                        }
                        <InputError message={errors.brand_id} />
                    </div>
                    <div className="md:w-4/5 ml-3 mb-5">
                        <label htmlFor="categories" className={labelCSS}>Categories:</label>
                        {
                            <Select
                                isMulti
                                ref={categoriesRef}
                                name="categories"
                                id="categories"
                                defaultValue={productCategories}
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
                <div className="flex mt-4 mb-5 items-baseline group">
                    <div className="md:w-1/2">
                        <label htmlFor="option" className={labelCSS}>Options Available:</label>
                        <CreatableSelect
                            isClearable
                            ref={optionsNameRef}
                            name="option"
                            id="option"
                            options={optionName}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder={`Options (${optionName.length})`}
                            onCreateOption={(e) => createOption(e)}
                            onChange={selectOption}
                        />
                    </div>
                    <div className="md:w-1/2 self-end">
                        <CreatableSelect
                            ref={selectOptionsRef}
                            isMulti
                            isDisabled={disabled}
                            name="optionsValues"
                            id="optionsValues"
                            value={optionValues}
                            className="basic-multi-select dark:bg-transparent"
                            classNamePrefix="select"
                            placeholder="Options Available"
                            onChange={(e) => handleChange('options', e)}
                        />
                        <InputError message={errors.optionsAvailable} />
                    </div>
                </div>
                <div>
                    <label htmlFor="images" className={labelCSS}>Images</label>
                    <DragInput productImages={product.images} updateFiles={setData} />
                    <InputError message={errors.images} />
                </div>
                <ButtonFormDiv href="products.index" display="Update" />
            </form>
        </AuthenticatedLayout>
    )
}