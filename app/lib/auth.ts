// import "server-only";
"use server";

import jwt from "jsonwebtoken";
import { z } from "zod";
import mongoose from "mongoose";
import UserModel from "../models/user";
import dbConnect from "../dbConnect";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";
// import { ENV } from "@/utils";




const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only letters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^\+?[0-9\s-]{6,}$/, "Invalid phone number format"),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(32)
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
});

// Type
type UserInput = z.infer<typeof userSchema>;

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || "my_jwt_secret_here";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Response type
type AuthResponse =
  | { success: true; token: string; message: string }
  | { success: false; message: string };

export async function signup(userData: UserInput): Promise<AuthResponse> {
  try {
    const validatedFields = userSchema.parse(userData);

    // Check for existing account
    const existingUser = await UserModel.findOne({
      email: validatedFields.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const user = new UserModel({
      firstName: validatedFields.firstName,
      lastName: validatedFields.lastName,
      phone: validatedFields.phone,
      email:validatedFields.email.toLowerCase(),
      password: await bcrypt.hash(validatedFields.password, 10),
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      success: true,
      token,
      message: "Account created successfully",
    };
  } catch (error) {
    let errorMessage = "Signup failed";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}


// export async function userauth() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token');

//   if (!token) return null;

//   try {
//     const payload = jwt.verify(token.value, JWT_SECRET) as {
//       _id: string
//       email: string
//       iat: number
//       exp: number
//     }

//     // Verify user still exists in DB
//     await dbConnect()
//     const user = await UserModel.findById(payload._id)
//     if (!user) return null
//     console.log(user);
    

//     return {
//       id: user.id.toString(),
//       email: user.email,
//       name: `${user.firstName} ${user.lastName}`
//     }
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       // Handle token refresh here if needed
//       return null
//     }
//     return null
//   }
// }

export async function userauth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  console.log('[Auth] Token exists:', !!token);
  if (!token) return null;

  try {
    console.log('[Auth] Verifying token...');
    const payload = jwt.verify(token.value, JWT_SECRET) as {
      userId: string;
      email: string;
      firstName: string;
      phone: string;
      lastName: string;
      iat: number;
      exp: number;
    };

    console.log('[Auth] Token payload:', payload);
    
    await dbConnect();
    console.log('[Auth] DB connected:', mongoose.connection.readyState === 1);

    const user = await UserModel.findById(payload.userId)
    console.log('[Auth] User found:', !!user);
    if (!user) return null;

    return {
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
      name: `${user.firstName} ${user.lastName}`,
      phone: `${user.phone}`
    };
  } catch (error) {
    console.error('[Auth] Error:', error);
    return null;
  }
}

// USER AUTH SESSION VERIFY
// lib/auth.ts


const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifySession(requiredRole?: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("No session token found");
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId || payload._id as string;

    // Verify user exists in database
    await dbConnect();
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    // Check role if required
    if (requiredRole && user.role !== requiredRole) {
      throw new Error("Insufficient permissions");
    }

    return {
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (error) {
    // Clear invalid token
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: "",
      maxAge: -1,
      path: "/",
    });

    const errorMessage = error instanceof Error ? error.message : "Authentication failed";
    redirect(`/signin?error=${encodeURIComponent(errorMessage)}`);
  }
}
