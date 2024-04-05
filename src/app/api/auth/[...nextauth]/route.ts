import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from 'next-auth';
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials: Record<string, string> | undefined) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                
                const { email, password } = credentials;
                
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
            
                    if (!user) {
                        return null;
                    }
            
                    const passwordsMatch = await bcrypt.compare(password, user.password);
            
                    if (!passwordsMatch) {
                        return null;
                    }
            
                    return user;
                } catch (error) {
                    console.log(error);
                    return null; 
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}