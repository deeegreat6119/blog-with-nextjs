"use client"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: unknown;
}

interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const AuthorInfo = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setUser({
          firstName: decoded.firstName || "User",
          lastName: decoded.lastName || "User",
          email: decoded.email || "",
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      <span className="text-sm">By {user.firstName || 'Anonymous'}</span>
    </div>
  );
};

export default AuthorInfo;