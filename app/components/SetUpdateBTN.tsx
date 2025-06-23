import React from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
  confirmText?: string;
}

export function SubmitButton({ variant = "default", confirmText, ...props }: SubmitButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmText && !window.confirm(confirmText)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`${
        variant === "destructive" ? "bg-red-600 hover:bg-red-700 focus:ring-red-500" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      } px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {props.children}
    </button>
  );
}
