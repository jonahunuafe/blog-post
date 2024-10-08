"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import TextArea from "@/components/TextArea";
import Image from "next/image";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Songbirds",
  photo: ""
}

const CreateBlog = () => {
  const CLOUD_NAME="dn7lmikzs"
  const UPLOAD_PRESET="nextjs_blogpost_images"
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  if(status === "loading") {
    return <p>loading...</p>
  }

  if(status === "unauthenticated") {
    return <p>Access denied</p>
  }
  

  const handleChange = (event) => {
    setError("")
    const { name, value, type, files } = event.target;

    if(type === "file") {
      setState({...state, [name]: files[0]});
    } else {
      setState({...state, [name]: value})
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { photo, title, category, description, excerpt, quote } = state;

    if(!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.")
      return;
    }

    if(photo) {
      const maxSize = 5 * 1024 * 1024;  //5MB in bytes
      if(photo.size > maxSize) {
        setError("File is too large. Please select a file under 5MB.")
        return;
      }
    }

    if(title.length < 4) {
      setError("Title must be at least 4 characters long.")
      return;
    }

    if(description.length < 20) {
      setError("Description must be at least 20 characters long.")
      return;
    }

    if(excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.")
      return;
    }

    if(quote.length < 6) {
      setError("Quote must be at least 6 characters long.")
      return;
    }

    try {
      setIsLoading(true)
      setError("")
      setSuccess("")
      const image =  await uploadImage();

      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        //We can get the authorId from session
        authorId: session?.user?._id
      }

      const response  = await fetch(`${apiUrl}/api/blog`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`
        },
        method: "POST",
        body: JSON.stringify(newBlog)
      })

      if(response?.status === 201) {
        setSuccess("Blog created successfully");
        setTimeout(() => {
          router.refresh();
          router.push("/blog")
        }, 1500);
      } else {
        setError("Error occured while creating blog.")
      }
    } catch(error) {
      console.log(error);
      setError("Error occured while creating blog.")
    }

    setIsLoading(false)
  }

  const uploadImage = async () => {
    if(!state.photo) return;

    const formData = new FormData();

    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`http://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"]
      }

      return image;
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <section className="container max-w-3xl py-24">
      <h2 className="mb-5">
        <span className="special-word">Create</span> Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          type="text"
          name="title" 
          placeholder="Write your title here..."
          onChange={handleChange}
          value={state.title}
        />

        <TextArea
          label="Description"
          rows="4"
          name="description" 
          placeholder="Write your description here..."
          onChange={handleChange}
          value={state.description}
        />

        <TextArea
          label="Excerpt"
          rows="2"
          name="excerpt" 
          placeholder="Write your excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <TextArea
          label="Quote"
          rows="2"
          name="quote" 
          placeholder="Write your quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Select an option</label>
          <select 
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="Songbirds">Songbirds</option>
            <option value="Waterfowl">Waterfowl</option>
            <option value="Parrots">Parrots</option>
            <option value="Seabirds">Seabirds</option>
            <option value="Gamebirds">Gamebirds</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>

          <input 
            onChange={handleChange} 
            type="file" 
            name="photo" 
            accept="image/*" 
          />

          {
            state.photo && (
              <div>
                <Image 
                  src={URL.createObjectURL(state.photo)} 
                  priority
                  alt="sample imaage" 
                  width={0} 
                  height={0} 
                  sizes="100vw" 
                  className="w-32 mt-5" 
                />
              </div>
            )
          }
        </div>

        {
          error && <div className='text-red-700'>{error}</div>
        }

        {
          success && <div className='text-green-700'>{success}</div>
        }
            
        <button type='submit' className='btn'>
          {isLoading ? "Loading" : "Create"} 
        </button>
      </form>
    </section>
  )
}

export default CreateBlog;