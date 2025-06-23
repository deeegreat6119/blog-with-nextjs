"use client";

import { logout } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            // Optional: You can add client-side cleanup here if needed
            router.push("/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (

        <button
            className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-opacity-50"
            onClick={handleLogout}
        >
            <span className="font-medium">Log out</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
            </svg>
        </button>
    );
}