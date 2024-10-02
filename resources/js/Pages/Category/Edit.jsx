import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import * as Constants from '../../Constants';

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

export default function Edit({ auth, category }) {
    const { data, setData, put, errors } = useForm({
        name: category.name || '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    }

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Category</h2>}
        >
            <Head title="Category" />

            <form className="max-w-md mt-5 mx-auto" onSubmit={onSubmit}>
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