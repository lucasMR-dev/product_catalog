import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from 'react-select';

const inputCSS = "block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const labelCSS = "peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

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

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('brands.store'));
    }

    const handleChange = (e) => {
        let formated = [];
        e.map((option) => {
            formated.push(option.value);
        });
        setData('categories', formated);
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Brands</h2>}
        >
            <Head title="Brands" />

            <form className="max-w-md mx-auto" onSubmit={onSubmit}>
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
                <div className="flex flex-wrap m-4 items-center justify-center text-gray-900 dark:text-white">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium 
                    rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                    dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800 mb-2">
                        Submit
                    </button>
                    <button type="button" className="text-gray-400 bg-white hover:bg-gray-100 focus:outline-none 
                    focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 
                    px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 
                    dark:focus:ring-gray-700 dark:border-gray-700 mb-2 ml-2">
                        <Link href={route('brands.index')}>
                            Cancel
                        </Link>
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    )
}