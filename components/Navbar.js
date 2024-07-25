"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Jonah from "../public/image/jonah.jpeg"
import { AiOutlineClose } from "react-icons/ai"
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();

  const pathname =usePathname();

  const [showDropdown, setShowDropdown] = useState(false)

  const handleShowDropDown = () => setShowDropdown(prev => true)
  const handleHideDropDown = () => setShowDropdown(prev => false)
  
  return (
    <div className="container py-2 h-16 flex items-center justify-between">
        <Link href="/">
            <h2>
                Jonah <span className="special-word">Blog</span>
            </h2>
        </Link>

        <ul className="flex items-center gap-3">
            <li>
                <Link 
                    href="/blog" 
                    className={ pathname === "/blog" ? "text-primaryColor font-bold" : "" } 
                >
                    Blog
                </Link>
            </li>

            {
                session?.user ? (
                <>
                    <li>
                        <Link 
                            href="/create-blog"
                            className={ pathname === "/create-blog" ? "text-primaryColor font-bold" : "" }
                        >
                            Create
                        </Link>
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
                                        <AiOutlineClose onClick={handleHideDropDown} 
                                            className="w-full cursor-pointer"
                                        />
                                        <button onClick={() => {signOut(); handleHideDropDown()}}>Logout</button>
                                        <Link onClick={handleHideDropDown} href="/user">
                                            Profile
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </li>
                </>
                ) : (
                    <>
                        <li>
                            <Link 
                                href="/login"
                                className={ pathname === "/login" ? "text-primaryColor font-bold" : "" }
                            >
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/signup"
                                className={ pathname === "/signup" ? "text-primaryColor font-bold" : "" }
                            >
                                Sign Up
                            </Link>
                        </li>
                    </>
                )
            }
        </ul>
    </div>
  )
}

export default Navbar