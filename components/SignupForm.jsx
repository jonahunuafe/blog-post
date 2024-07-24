"use client"

import React, { useState } from 'react'
import Input from './Input'
import Link from 'next/link'

const initialState = {
    name: "",
    email: "",
    password: ""
}

const SignupForm = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setError("")
    setState({...state, [event.target.name]: event.target.value})
  }


  return (
    <section className='container'>
        <form onSubmit={handleSubmit} className='border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5'>
            <h2 className='text-center special-word'>Sign up</h2>

            <Input
                label='Name'
                type='text'
                name='name' 
                onChange={handleChange}
                value={state.name}
            />
            <Input
                label='Emal'
                type='text'
                name='email' 
                onChange={handleChange}
                value={state.email}
            />
            <Input
                label='Password'
                type='password'
                name='password' 
                onChange={handleChange}
                value={state.password}
            />

            {
                error && <div className='text-red-700'>{error}</div>
            }

            {
                success && <div className='text-green-700'>{success}</div>
            }
            
            <button type='submit' className='btn w-full'>
                {isLoading ? "Loading" : "Sign up"} 
            </button>

            <p className='text-center'>
                Already a user? {" "}
                <Link href="/login" className='text-primaryColor'>
                    Login
                </Link>
            </p>
        </form>
    </section>
  )
}

export default SignupForm