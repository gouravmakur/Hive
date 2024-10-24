import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/auth'
import { login } from '../Store/AuthSlice'
import {Button, Input, Logo} from './index'
import { useForm } from 'react-hook-form'

function Signup() {
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signUp = async (data)=>{
        setError("")
        try {
            
            const user = await authService.createAccount(data);
            if(user){
                
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(login(userData));
                    navigate('/');
                }
            }

        } catch (error) {
            console.error("Error during account creation:", error);
            setError(error.message);
        }
    }
  return (

    <div className="flex items-center justify-center w-full">
      <div className={` w-full max-w-lg  border-black/10 bg-gray-200 bg-opacity-25  backdrop-blur-xl border  rounded-lg px-10 py-8 shadow-lg`}>
            <div className="mb-2 flex justify-center my-8">
                <h1 className='text-5xl font-bold  text-gray-600 py-4 tracking-tighter'>Join Hive</h1>
            </div>
            <h2 className="text-center text-2xl font-semibold leading-tight text-gray-500">Sign up to create account</h2>
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
                      label = "Name: "
                      placeholder = "Enter your name"
                      type = 'text'
                      {...register('name' , {
                        required : true,
                      })}
                    />

                    <Input 
                        label = "Email: "
                        placeholder = "Enter your email"
                        type = 'eamil'
                        {...register ("email" , {
                            required : true,
                            validate: {
                                pattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />

                    <Input
                        label = "Password: " 
                        placeholder = "Enter your password"
                        type = "password"
                        {...register ('password', {
                            required : true,
                        })}
                    />

                    <Button
                    type= 'submit'
                    className='w-full hover:cursor-pointer mt-5 mb-10 bg-orange-600 shadow-md hover:bg-orange-500'
                    >
                        Create Account
                    </Button>
                </div>

            </form>
      </div>
    </div>
  )
}

export default Signup;
