// http://localhost:3000/api/signup

import User from "@/models/User";
import bcrypt from "bcrypt";
import {connect} from "../../../lib/db"
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const data = await req.json();
        console.log(data)

        return NextResponse.json("new data", {status: 201})
    } catch(error) {
        return NextResponse.json({message: "POST error (Sign up)"})
    }
}