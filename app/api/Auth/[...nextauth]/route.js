import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connect } from "../../../../lib/db";

const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                await connect();

                const { email, password } = credentials;

                try {
                    const user = await User.findOne({email});

                    if(!user) {
                        throw new Error("Invalid input")
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(!passwordMatch) {
                        throw new Error("Paaswords don't match")
                    } else {
                        const { password, ...currentUser } = user._doc;
                        const accessToken = 
                    }
                } catch() {

                }
            }
        })
    ]
}