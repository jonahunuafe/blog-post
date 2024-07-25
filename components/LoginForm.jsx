'use client'

import React, { useState } from 'react'
import Input from './Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const initialState = {
  email: "",
  password: ""
}

const LoginForm = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = state;

    if(!email || !password) {
        setError("All fields are required");
        return;
    }

  //Regular expression pattern for a basic email validation
  const pattern = /^[a-zA-z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}/

  if(!pattern.test(email)) {
    setError("Please enter a valid email address.")
    return;
  }

  if(password.length < 6) {
    setError("Password must be at least 6 characters long.")
    return;
  }

  try {
    setIsLoading(true);
    
    const res = await signIn("credentials", {
      email, password, redirect: false
    })

    if(res?.error) {
      setError("Invalid credentials")
      setIsLoading(false)
      return;
    }

    router.push("/blog")
  } catch(error) {
    console.log(error)
  }

  setIsLoading(false);
 }


  const handleChange = (event) => {
    setError("")
    setState({...state, [event.target.name]: event.target.value})
  }

  return (
    <section className='container'>
        <form onSubmit={handleSubmit} className='border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5'>
            <h2 className='text-center special-word'>Login</h2>

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
            
            <button type='submit' className='btn w-full disabled'>
              {isLoading ? "Loading" : "Login"}
            </button>

            <p className='text-center'>
                Need an account? {" "}
                <Link href="/signup" className='text-primaryColor'>
                    Sign up
                </Link>
            </p>
        </form>
    </section>
  )
}

export default LoginForm