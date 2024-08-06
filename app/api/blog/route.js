// http://localhost:3000/api/blog


import Blog from "@/models/Blog";
import {connect} from "../../../lib/db"
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function POST(req) {
    await connect();

    const accessToken = req.headers.get("authorization");
    // [bearer, token]
    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token);

    if(!accessToken || !decodedToken) {
        return new Response (
            JSON.stringify({error: "unathorized (wrong or expired token)"}),
            {status: 403}
        );
    }

    try {
        const body = await req.json();
        const newBlog = await Blog.create(body);

        return NextResponse.json(newBlog, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "POST error (create blog)"})
    }
}


export async function GET(req) {
    await connect();

    try {
        const blogs = await Blog.find({}).populate({
            path: "authorId",
            select: "-password"
        }).sort({ createdAt: -1 })

        return NextResponse.json(blogs);

    } catch(error) {
        return NextResponse.json({message: "GET error"}, {status: 500}) 
    }
}