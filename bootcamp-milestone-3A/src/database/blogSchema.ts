// src/database/blogSchema.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  date: Date;
  description: string;
  content: string;
  image: string;
  image_alt: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    image_alt: { type: String, required: true },
  },
  {
    // This collection name must match what you see in Atlas: test.blogs
    collection: "blogs",
  }
);

// Re-use the model in dev so Mongoose doesn’t complain
const BlogModel: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", blogSchema);

export default BlogModel;
