import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  phone: { type: String, required: [true, "Phone number is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, {
  timestamps: true,
});

const UserModel: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>("Users", UserSchema);

export default UserModel;
