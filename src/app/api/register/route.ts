import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({name, email, password: hashedPassword});

        return NextResponse.json({message: "User registered successfully"}, {status: 201})
    } catch (err) {
        return NextResponse.json({message: "An error occurred while registering user"}, {status: 500});
    }
}