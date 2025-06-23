import UserModel from "@/app/models/user";
import PostModel from "@/app/models/post"; // Make sure this exists

export const resolvers = {
  Query: {
    hello: () => "hello world",
    myname: () => {
      const firstname = "felix";
      return `my name is ${firstname}`;
    },
    users: async () => {
      try {
        return await UserModel.find().select("-password");
      } catch (error) {
        console.log("Failed to fetch users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_: unknown, { id }: { id: string }) => {
      try {
        return await UserModel.findById(id).select("-password");
      } catch (error) {
        console.log(`Failed to fetch user ${id}:`, error);
        throw new Error("User not found");
      }
    },
    posts: async () => {
      try {
        return await PostModel.find();
      } catch (error) {
        console.log("Failed to fetch posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },
    post: async (_: unknown, { id }: { id: string }) => {
      try {
        return await PostModel.findById(id);
      } catch (error) {
        console.log("Failed to fetch post:", error);
        throw new Error("Post not found");
      }
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      {
        email,
        firstName,
        lastName,
        phone,
        password,
      }: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        password: string;
      }
    ) => {
      try {
        const user = new UserModel({ email, firstName, lastName, phone, password });
        await user.save();
        return user;
      } catch (error) {
        console.log("User registration error:", error);
        throw new Error("User registration failed");
      }
    },

    createPost: async (
      _: unknown,
      {
        title,
        body,
      }: {
        title: string;
        body: string;
      }
    ) => {
      try {
        const post = new PostModel({ title, body });
        await post.save();
        return post;
      } catch (error) {
        console.log("Failed to create post:", error);
        throw new Error("Failed to create post");
      }
    },

    updatePost: async (
      _: unknown,
      { id, title, body }: { id: string; title?: string; body?: string }
    ) => {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          id,
          { title, body },
          { new: true }
        );
        if (!updatedPost) throw new Error("Post not found");
        return updatedPost;
      } catch (error) {
        console.log("Failed to update post:", error);
        throw new Error("Failed to update post");
      }
    },

    deletePost: async (_: unknown, { id }: { id: string }) => {
      try {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        if (!deletedPost) throw new Error("Post not found");
        return deletedPost;
      } catch (error) {
        console.log("Failed to delete post:", error);
        throw new Error("Failed to delete post");
      }
    },
  },
};

