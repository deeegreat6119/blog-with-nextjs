"use client";

interface UserInfoClientProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function UserInfoClient({
  firstName = "User",
  lastName = "User",
  email = "",
}: UserInfoClientProps) {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
        <span className="text-white">{firstName.charAt(0).toUpperCase()}</span>
        <span className="text-white">{lastName.charAt(0).toUpperCase()}</span>
      </div>
      <div>
        <p className="font-medium">{firstName}</p>
        <p className="text-xs text-slate-400">{email}</p>
      </div>
    </div>
  );
}