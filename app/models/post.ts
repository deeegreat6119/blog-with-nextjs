import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  more: string;
  time: string;
  author?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}


const PostSchema: Schema = new Schema<IPost>({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [120, 'Title cannot exceed 120 characters'],
    trim: true
  },
  body: { 
    type: String, 
    required: [true, 'Post content is required'],
    minlength: [50, 'Post content must be at least 50 characters'] 
  },
  author: { 
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true
});

// 3. Model creation with type safety
const PostModel: Model<IPost> = 
  mongoose.models.Post || // Check if model exists
  mongoose.model<IPost>('Post', PostSchema); // Create if doesn't exist

export default PostModel;