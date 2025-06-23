
"use client";

import { useActionState, useEffect } from "react";
import { changePassword, deleteAccount } from "@/app/lib/actions";
import { SubmitButton } from "@/app/components/SetUpdateBTN";
// Removed unused import useFormState
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface PasswordState {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
  success?: boolean;
}

export default function AccountSettings() {
  const router = useRouter();
  
  // Enhanced password change handler with validation
  const changePasswordWithValidation = async (
    state: PasswordState | null,
    formData: FormData
  ): Promise<PasswordState> => {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    // Validate password match
    if (newPassword !== confirmPassword) {
      return {
        errors: {
          confirmPassword: ["Passwords do not match"],
        },
        message: "Passwords do not match",
      };
    }
    
    try {
      await changePassword(formData);
      return { success: true, message: "Password changed successfully!" };
    } catch (error) {
      // Removed unused variable 'error'
      return {
        message: error instanceof Error ? error.message : "An error occurred while changing your password.",
      };
    }
  };

  const [changePasswordState, changePasswordAction] = useActionState(
    changePasswordWithValidation,
    null
  );

  // Delete account handler
  const deleteAccountHandler = async (): Promise<{ success?: boolean; error?: string }> => {
    try {
      await deleteAccount();
      return { success: true };
    } catch (error) {
      console.log(error);
      
      return { error: "Failed to delete account" };
    }
  };

  const [deleteAccountState, deleteAccountAction] = useActionState(
    deleteAccountHandler,
    null
  );

  // Show toast notifications for state changes
  useEffect(() => {
    if (changePasswordState?.success) {
      toast.success(changePasswordState.message || "Password changed successfully!");
    } else if (changePasswordState?.message) {
      toast.error(changePasswordState.message);
    }
  }, [changePasswordState]);

  useEffect(() => {
    if (deleteAccountState?.success) {
      toast.success("Account deleted successfully. Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } else if (deleteAccountState?.error) {
      toast.error(deleteAccountState.error);
    }
  }, [deleteAccountState, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your account preferences</p>
        </div>

        {/* Password Change Section */}
        <div className="px-6 py-5 space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Change Password</h4>
            <form action={changePasswordAction} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {changePasswordState?.errors?.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {changePasswordState.errors.currentPassword.join(", ")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {changePasswordState?.errors?.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {changePasswordState.errors.newPassword.join(", ")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {changePasswordState?.errors?.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {changePasswordState.errors.confirmPassword.join(", ")}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <SubmitButton className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Update Password
                </SubmitButton>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-red-800 mb-3">Danger Zone</h4>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-red-50 p-4 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">Delete your account</p>
                <p className="text-xs text-gray-600 mt-1">
                  This will permanently delete your account and all associated data.
                </p>
              </div>
              <form action={deleteAccountAction}>
                <SubmitButton
                  variant="destructive"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  confirmText="Are you sure you want to delete your account? This action cannot be undone."
                >
                  Delete Account
                </SubmitButton>
              </form>
              {deleteAccountState?.success && (
                <p className="mt-2 text-green-600">Account deleted successfully.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
