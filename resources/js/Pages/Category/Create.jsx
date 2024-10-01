import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const inputCSS = "block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const labelCSS = "peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Category</h2>}
        >
            <Head title="Category" />

            <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="name" className={labelCSS}>Name</label>
                    <TextInput id="name" type="text" className={inputCSS} value={data.name} isFocused={true} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </div>
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
                    <Link href={route('categories.index')}>
                        Cancel
                    </Link>
                </button>
            </form>
        </AuthenticatedLayout>
    )
}