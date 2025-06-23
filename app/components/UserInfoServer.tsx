// components/server/UserInfoServer.tsx
import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import UserInfoClient from "@/app/components/UserInfo"
import UserModel from "@/app/models/user"

// interface TokenPayload {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   [key: string]: unknown;
// }

export default async function UserInfoServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log('here is my token',token);
  


  if (!token) return null;

  try {
    // const decoded: TokenPayload = jwtDecode(token);
    // console.log(decoded);
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await UserModel.findById(userId);
    console.log(user);
    
    
    
    if (!user) {
      return null;
    }
    console.log('[UserInfoServer] User data:', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    return (
      <UserInfoClient
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
      />
    );
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}