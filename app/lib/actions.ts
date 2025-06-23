"use server";

import { CreatePost } from "../../types";
import dbConnect from "../dbConnect";
import PostModel from "../models/post";
import UserModel from "../models/user";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
// import { Redirect } from "next";
import { cookies } from "next/headers";
import { signup, userauth } from "./auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const createPost = async (data: CreatePost) => {
  await dbConnect();

  try {
    const response = await PostModel.create({
      title: data.title,
      body: data.body,
      author: data.author,
    });

    return {
      success: true,
      message: "Post added successfully",
      data: response,
    };
  } catch (error) {
    return {
      error,
      message: "An error occured",
      success: false,
    };
  }

  // redirect("/admin/posts")
};

type FormState = {
  success: boolean;
  message: string;
  token?: string;
};

export async function handleSignUp(
  preState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    await dbConnect();
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const result = await signup({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    if (result.success && result.token) {
      (await cookies()).set("token", result.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
    return result;
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


export async function updateProfile(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await userauth();

  if (!session?.email) {
    return { success: false, message: "Session expired. Please sign in again." };
  }

  try {
    const updates = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
    };

    if (!updates.firstName || !updates.lastName) {
      return { success: false, message: "First and last name are required" };
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: session.email },
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return { success: false, message: "User not found" };
    }

    const newToken = jwt.sign(
      { userId: (updatedUser._id as unknown as string).toString(), email: updatedUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

  // ReadonlyRequestCookies does not have set method, need to use cookies() from 'next/headers' differently
  // Instead, use cookies().set() directly without awaiting cookies()
  (await cookies()).set("token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Profile update failed" };
  }
}


// app/actions/account.ts

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export async function changePassword(formData: FormData): Promise<void> {
  await dbConnect();
  // Await cookies() to get the cookies object asynchronously
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    // Validate form data
    const validated = passwordSchema.parse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword")
    });

    // Get user from token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isMatch = await bcrypt.compare(validated.currentPassword, user.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validated.newPassword, 10);

    // Update password
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}

export async function deleteAccount() {
  await dbConnect();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Delete user
    await UserModel.findByIdAndDelete(userId);
    
  // Clear session
  (await cookies()).set({
    name: "token",
    value: "",
    maxAge: -1,
    path: "/",
  });
    

    revalidatePath("/");
    return { success: true, message: "Account deleted successfully" };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Account deletion failed" };
  }
}

// app/lib/actions.ts
export async function logout() {
  (await cookies()).set({
    name: "token",
    value: "",
    maxAge: -1,
    path: "/",
  });
  revalidatePath("/");
  redirect("/signin");
}
