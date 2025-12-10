import mongoose, { Schema, Model, Document } from "mongoose";

export interface IComment extends Document {
  name: string;
  text: string;
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  date: Date;
  description: string;
  content: string;
  author: string;
  image_url: string;
  comments: IComment[];
}

// Comment sub-document schema
const commentSchema = new Schema<IComment>({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

// Blog schema
const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image_url: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
  },
  {
    collection: "blogs", // make sure this matches your Atlas collection
  }
);

// Reuse model if it already exists (Next.js dev hot reload)
const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default BlogModel;


