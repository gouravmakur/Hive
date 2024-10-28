import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../Store/AuthSlice'
import { Button, Input, Logo, Signup } from './index'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/auth'
import { useForm } from 'react-hook-form'

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true)
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }

        } catch (error) {
            setError(error.message || "An error occurred during login.");
            console.log("The error: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center my-8">
                    <h1 className='text-5xl font-bold  text-gray-600 py-4 tracking-tighter mb-4'>Welcome Back!</h1>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-orange-500"
                    >
                        Sign Up
                    </Link>
                </p>
                {error? <p className="text-red-600 my-8 text-center opacity-80">{error}</p> : null}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='Enter your Email '
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    pattern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder='Enter your password'
                            type='password'
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className='w-full bg-orange-600'
                            disabled={loading}
                        >{loading? <div
                            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div> : "Sigin" }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
