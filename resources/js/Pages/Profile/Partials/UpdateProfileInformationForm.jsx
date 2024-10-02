import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const Storage = 'http://localhost:8000/storage/';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            image_profile: '',
            _method: 'PUT'
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>
            {/* Form */}
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid grid-cols-2">
                    {/* 1st Grid Column */}
                    <div>
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        {/* Image Input */}
                        <div>
                            <InputLabel htmlFor="image_profile" value="Image Profile" />
                            <input className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                                bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="logo_help" id="image_profile" type="file"
                                onChange={(e) => setData("image_profile", e.target.files[0])}
                                accept="image/*"
                            />
                            <span className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="logo_help">PNG, JPG or GIF (Max. Size 7MB).</span>
                            <InputError className="mt-2" message={errors.image_profile} />
                        </div>
                    </div>
                    {/* 2nd Grid Column */}
                    <div className="mx-auto">
                        <img className="h-60" src={Storage + user.image_profile} />
                    </div>
                </div>
                {/* Unverified Email Alert */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}
                {/* Save Button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
