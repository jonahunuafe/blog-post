"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

import {
  AiFillDelete,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

import demoImg from "../../../public/image/jonah.jpeg";
import Input from '@/components/Input';

const BlogDetails = ({ params }) => {
  
  return (
    <div>BlogDetails {params.id}</div>
  )
}

export default BlogDetails;