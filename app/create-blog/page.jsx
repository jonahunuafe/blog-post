"use client"

import React, { useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Songbirds",
  photo: ""
}

const CreateBlog = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    setError("")
    setState({...state, [event.target.name]: event.target.value})
  }

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Create</span> Blog
      </h2>
      <form className="space-y-5">
      <Input
        label='Title'
        type='text'
        name='title' 
        placeholder='Write your title here...'
        onChange={handleChange}
        value={state.title}
      />
      </form>
    </section>
  )
}

export default CreateBlog;