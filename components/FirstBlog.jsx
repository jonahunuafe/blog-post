import React from 'react'
import Image from 'next/image'
import demoImg from "../public/image/avatar-icon.png"
import Link from 'next/link'
import { AiTwotoneCalendar } from 'react-icons/ai'
import moment from 'moment'

const FirstBlog = ({ firstBlog }) => {
  const timeStr = firstBlog?.createdAt;
  const time = moment(timeStr);
  const formattedTime = time.format("MMMM Do YYYY");
  return (
    <section>
        <Link href={`/blog/${firstBlog?._id}`}>
            <div className="flex flex-col md:flex-row items-center bg-gray-800 gap-8 md:gap-10">
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

                <div className="w-full lg:w-3/5 space-y-5 pl-3 pb-4 lg:pl-0 lg:pb-0">
                    <div className="flex items-center gap-3 text-xs">
                        <p className="text-primaryColor">{firstBlog?.category}</p>

                        <p className="flex items-center gap-1 text-primaryColor">
                            <AiTwotoneCalendar />
                            {formattedTime}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2>{firstBlog?.title}</h2>
                        <p className="text-sm text-paragraphColor">
                            {firstBlog?.excerpt}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            src={
                                firstBlog?.authorId?.avatar?.url ? 
                                firstBlog?.authorId?.avatar?.url : 
                                demoImg
                            } 
                            alt="picture of the author"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-10 h-10 rounded-full"
                        />

                        <div className="text-xs">
                            <h6>{firstBlog?.authorId?.name}</h6>
                            <p className="text-paragraphColor">
                                {firstBlog?.authorId?.designation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </section>
  )
}

export default FirstBlog