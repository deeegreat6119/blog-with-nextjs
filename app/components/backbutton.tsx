"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/admin/posts')}
      className="group inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 
                 focus:ring-offset-2 rounded-md px-2 py-1 -ml-2"
      aria-label="Back to all posts"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
          clipRule="evenodd" 
        />
      </svg>
      Back to all posts
    </button>
  );
}