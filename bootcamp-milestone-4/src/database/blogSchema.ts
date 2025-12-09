// src/database/blogSchema.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IComment {
  name: string;
  text: string;
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  date: Date;
  description: string;
  body: string;
  image_url: string;
  image_alt: string;
  comments: IComment[];
}

const commentSchema = new Schema<IComment>({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    image_url: { type: String, required: true },
    image_alt: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
  },
  {
    collection: "blogs", // this must match the collection name in Atlas
  }
);

// Re-use the model in dev so Mongoose doesn’t complain
const BlogModel: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog>) || mongoose.model<IBlog>("Blog", blogSchema);

export default BlogModel;
