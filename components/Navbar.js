"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Jonah from "../public/image/jonah.jpeg"
import { AiOutlineClose } from "react-icons/ai"

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const loggedIn = true;

  const handleShowDropDown = () => setShowDropdown(prev => true)
  
  return (
    <div className="container py-2 h-16 flex items-center justify-between">
        <Link href="/">
            <h2>
                Light <span className="special-word">Code.</span>
            </h2>
        </Link>

        <ul className="flex items-center gap-3">
            <li>
                <Link href="/blog">Blog</Link>
            </li>

            {
                loggedIn ? (
                <>
                    <li>
                        <Link href="/create-blog">Create</Link>
                    </li>
                    <li>
                        <div className="relative">
                            <Image 
                                onClick={handleShowDropDown}
                                src={Jonah} 
                                alt="avatar"
                                sizes="100vw"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />

                            {
                                showDropdown && (
                                    <div className="absolute top-0 right-0 bg-primaryColorLight p-5">
                                        <AiOutlineClose className="w-full cursor-pointer"/>
                                        <button>Logout</button>
                                        <Link href="/user">Profile</Link>
                                    </div>
                                )
                            }
                        </div>
                    </li>
                </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">Log In</Link>
                        </li>
                        <li>
                            <Link href="/signup">Sign Up</Link>
                        </li>
                    </>
                )
            }
        </ul>
    </div>
  )
}

export default Navbar