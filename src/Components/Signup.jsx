import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../Appwrite/auth';
import { useForm } from 'react-hook-form';
import { Button, Input } from './index';

function Signup() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const signUp = async (data) => {
        try {
            setError(""); // Clear previous errors
            setLoading(true); // Start loading

            const user = await authService.createAccount(data);

            if (user) {
                alert("Account created successfully! Login Using Email and Password");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            const errorMsg = error?.response?.data?.message || "Failed to create account. Please try again.";
            setError(errorMsg);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-lg border-black/10 bg-gray-200 bg-opacity-25 backdrop-blur-xl border rounded-lg px-10 py-8 shadow-lg">
                <div className="mb-2 flex justify-center my-8">
                    <h1 className="text-5xl font-bold text-gray-600 py-4 tracking-tighter">Join Hive</h1>
                </div>
                <h2 className="text-center text-2xl font-semibold leading-tight text-gray-500">
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-black/60 mb-6">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-orange-600"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signUp)}>
                    <div>
                        <Input
                            label="Name: "
                            placeholder="Enter your name"
                            type="text"
                            {...register('name', { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be valid",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register('password', { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                        <Button
                            type="submit"
                            className="w-full hover:cursor-pointer mt-5 mb-10 bg-orange-600 shadow-md hover:bg-orange-500"
                            disabled={loading} // Disable button during loading
                        >
                            {loading ? <div
                                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                                role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
