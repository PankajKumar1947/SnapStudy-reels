import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // verify the password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { message: "Invalid Password" },
                { status: 400 }
            )
        }

        // create jsonwebtoken
        const tokenPayload = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
            expiresIn: "1d"
        })

        return NextResponse.json(
            { message: "Login Successful" },
            { status: 200, headers: { "Set-Cookie": `token=${token}` } }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to Login User" },
            { status: 500 }
        )
    }

}