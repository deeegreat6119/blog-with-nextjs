"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  firstName?: string;
  lastName?: string
  email?: string;
  [key: string]: unknown;
}

const UserInfo = () => {
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        // console.log(decoded);
        
        setUser({
          firstName: (decoded.firstName as string) || "User",
          lastName: (decoded.lastName as string) || "User",
          email: (decoded.email as string) || "",
        });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
        <span className="text-white">{user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}</span>
        <span className="text-white">{user.lastName ? user.lastName.charAt(0).toUpperCase() : "B"}</span>
      </div>
      <div>
        <p className="font-medium">{user.firstName || "User"}</p>
        <p className="text-xs text-slate-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;

