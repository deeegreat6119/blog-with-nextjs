"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";


interface TokenPayload {
  role?: string;
  exp?: number;
  email?: string;
  // eslint-disable-next-line , @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface UserAuthGuardProps {
  children: React.ReactNode;
  redirectPath?: string;
  fallback?: React.ReactNode;
}

const UserAuthGuard = ({
  children,
  redirectPath = "/signin",
  fallback = null,
}: UserAuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authStatus, setAuthStatus] = useState<
    "loading" | "authorized" | "unauthorized"
  >("loading");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("Please log in to access this page");
        }

        // Basic token validation
        if (token.split(".").length !== 3) {
          throw new Error("Invalid session token");
        }

        const decoded: TokenPayload = jwtDecode(token);

        // Check if token is expired
        const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true;
        if (isExpired) {
          throw new Error("Your session has expired. Please log in again.");
        }

        // Verify the user has at least a basic user role
        if (!decoded.role) {
          throw new Error("Your account is not properly configured");
        }

        if (isMounted) {
          setAuthStatus("authorized");
          setAuthError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Authentication check failed:", error);
          localStorage.removeItem("token");
          setAuthStatus("unauthorized");
          setAuthError(
            error instanceof Error ? error.message : "Please log in to continue"
          );

          if (!pathname.startsWith(redirectPath)) {
            router.push(`${redirectPath}?from=${encodeURIComponent(pathname)}`);
          }
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, redirectPath, router]);

  if (authStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (authStatus === "unauthorized") {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="max-w-md mx-auto p-6 bg-yellow-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">Sign In Required</h2>
        <p className="text-yellow-800 mb-4">{authError}</p>
        <button
          onClick={() => router.push(redirectPath)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserAuthGuard;