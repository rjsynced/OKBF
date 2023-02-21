import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const Register = (props) => {
    // const { errors } = props
    const { initialFirstName, initialLastName, initialEmail, onSubmitProp } = props
    //keep track of what is being typed via useState hook
    const [user, setUser] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
        password: "",
        confirmPassword: ""
    });
    //handler when the form is submitted

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        onSubmitProp(user)
    }


    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to='/' className="font-medium text-indigo-600 hover:text-indigo-500">
                                return to store
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={onSubmitHandler} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="firstName" className="sr-only">First Name</label>
                                <input
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => changeHandler(e)}
                                    value={user.firstName}
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">Last Name</label>
                                <input
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => changeHandler(e)}
                                    value={user.lastName}
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => changeHandler(e)}
                                    value={user.email}
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => changeHandler(e)}
                                    value={user.password}
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => changeHandler(e)}
                                    value={user.confirmPassword}
                                    type="text"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                type="submit"
                                >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register