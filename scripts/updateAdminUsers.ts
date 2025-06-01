import mongoose from "mongoose";
import UserModel from "../app/models/user";

async function updateAdminUsers() {
  try {
    await mongoose.connect(process.env.DB_URI || "");

    // Update users who should be admins - example: by email or other criteria
    const adminEmails = ["admin@example.com"]; // Add your admin emails here

    const result = await UserModel.updateMany(
      { email: { $in: adminEmails } },
      { $set: { role: "admin" } }
    );

    console.log(`Updated ${result.modifiedCount} users to admin role.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating admin users:", error);
  }
}

updateAdminUsers();
