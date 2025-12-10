// src/database/projectSchema.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

type Comment = {
  name: string;
  text: string;
  createdAt: Date;
};

export interface ProjectDocument extends Document {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  date: Date;
  comments: Comment[];
}

const CommentSchema = new Schema<Comment>({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProjectSchema = new Schema<ProjectDocument>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: [String], required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
  comments: { type: [CommentSchema], default: [] },
});

const Project =
  (models.Project as mongoose.Model<ProjectDocument>) ||
  model<ProjectDocument>("Project", ProjectSchema);

export default Project;
