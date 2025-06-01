// "use server"
// import dbConnect from "./db";
// import mongoose, { Document, Model } from 'mongoose';

// await dbConnect();

// // 1. Define TypeScript interface
// interface IStudent extends Document {
//   firstname: string;
//   lastname: string;
//   email: string;
//   course: string;
//   dob: string;
//   image: string;
//   state: string;
//   matricNumber: string;
//   gender: string;
//   phone: string;
//   password: string;
//   passport: string;
//   filename: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // 2. Create Schema with validation
// const studentSchema = new mongoose.Schema<IStudent>({
//   firstname: { type: String, required: [true, 'First name is required'] },
//   lastname: { type: String, required: [true, 'Last name is required'] },
//   email: { 
//     type: String, 
//     required: [true, 'Email is required'],
//     unique: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//   },
//   course: { type: String, required: [true, 'Course is required'] },
//   dob: { type: String, required: [true, 'Date of birth is required'] },
//   image: String,
//   state: { type: String, required: [true, 'State is required'] },
//   matricNumber: { 
//     type: String, 
//     required: [true, 'Matric number is required'],
//     unique: true 
//   },
//   gender: { 
//     type: String, 
//     required: [true, 'Gender is required'],
//     enum: ['male', 'female', 'other'] 
//   },
//   phone: { 
//     type: String, 
//     required: [true, 'Phone number is required'],
//     match: [/^[0-9]{10,15}$/, 'Please fill a valid phone number'] 
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters'] 
//   },
//   passport: String,
//   filename: String
// }, { 
//   timestamps: true // Adds createdAt and updatedAt automatically
// });

// // 3. Create Model with type checking
// const StudentModel: Model<IStudent> = mongoose.models.Studentdata || 
//                                      mongoose.model<IStudent>('Studentdata', studentSchema);

// export default StudentModel;