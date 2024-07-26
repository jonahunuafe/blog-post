import React from 'react'
import Image from 'next/image'
import demoImg from "../public/image/jonah.jpeg"
import Link from 'next/link'
import { AiTwotoneCalendar } from 'react-icons/ai'

const FirstBlog = ({ firstBlog }) => {
  return (
    <section>
        <Link href={`/blog/${firstBlog?._id}`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full lg:w-2/5">
                    <Image 
                        src={firstBlog?.image ? firstBlog.image?.url : demoImg}
                        alt="first blog image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full rounded-lg" 
                    />
                </div>

                <div className="w-full lg:w-3/5 space-y-5">
                    <div className="flex items-center gap-3 text-xs">
                        <p className="text-primaryColor">{firstBlog?.category}</p>

                        <p className="flex items-center gap-1 text-primaryColor">
                            <AiTwotoneCalendar />
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    </section>
  )
}

export default FirstBlog