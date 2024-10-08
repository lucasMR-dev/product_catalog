import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import * as Constants from '@/Constants';
import ButtonFormDiv from "@/Components/ButtonFormDiv";

const inputCSS = Constants.inputCSS;
const labelCSS = Constants.labelCSS;

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
                <ButtonFormDiv href="categories.index" display="Create" />
            </form>
        </AuthenticatedLayout>
    )
}