import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from 'react-select';
import * as Constants from '@/Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Create({ auth, categoryList }) {
    const options = [];
    categoryList.map((cat) => {
        options.push({ value: cat.id, label: cat.name });
    });
    const { data, setData, post, errors } = useForm({
        name: '',
        logo: '',
        categories: [],
    });

    const handleChange = (e) => {
        let formated = [];
        e.map((option) => {
            formated.push(option.value);
        });
        setData('categories', formated);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('brands.store'));
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
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="logo_help" id="logo" type="file"
                            onChange={(e) => setData("logo", e.target.files[0])}
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
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Categories"
                            onChange={(e) => handleChange(e)}
                        />
                    }
                    <InputError message={errors.categories} />
                </div>
                <ButtonFormDiv href="brands.index" display="Create" />
            </form>
        </AuthenticatedLayout>
    )
}