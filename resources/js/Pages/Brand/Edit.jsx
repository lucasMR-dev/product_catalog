import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import * as Constants from '../../Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Edit({ auth, brand, categoryList }) {
    const [showDiv, setShowDiv] = useState(true);
    const initial = [];
    brand.categories.map((cat) => {
        initial.push(cat.id);
    });
    const { data, setData, post, errors } = useForm({
        name: brand.name || '',
        logo: '',
        categories: initial || [],
        _method: 'PUT'
    });

    const options = [];
    categoryList.map((cat) => {
        options.push({ value: cat.id, label: cat.name });
    });
    const currentCategories = [];
    brand.categories.map((cat) => {
        currentCategories.push({ id: cat.id, value: cat.id, label: cat.name });
    });

    const uploadImage = (e) => {
        setData("logo", e.target.files[0]);
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
        post(route('brands.update', brand.id));
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Brands</h2>}
        >
            <Head title="Brands" />

            <form className="max-w-sm md:max-w-md mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="name" className={labelCSS}>Name</label>
                    <TextInput id="name" type="text" className={inputCSS} value={data.name} isFocused={true} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <div className="w-full">
                        {showDiv && <img src={Constants.Storage + brand.logo} />}
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400 mt-2"
                            aria-describedby="logo_help" id="logo" type="file"
                            onChange={(e) => uploadImage(e)}
                            accept="image/*"
                        />
                        <span className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="logo_help">PNG, JPG or GIF (Max. Size 7MB).</span>
                        <InputError message={errors.logo} />
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    {
                        <Select
                            isMulti
                            name="categories"
                            id="categories"
                            defaultValue={currentCategories}
                            options={options}
                            className="format basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Categories"
                            onChange={(e) => handleChange(e)}
                        />
                    }
                </div>
                <ButtonFormDiv href="brands.index" display="Update" />
            </form>
        </AuthenticatedLayout>
    )
}