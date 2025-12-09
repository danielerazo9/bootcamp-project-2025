import mongoose, { Schema, Model } from "mongoose";

export type Project = {
  title: string;
  slug: string;
  date: Date;
  description: string;
  link: string;
};

const projectSchema = new Schema<Project>({
  title:      { type: String, required: true },
  slug:       { type: String, required: true },
  date:       { type: Date,   required: true },
  description:{ type: String, required: true },
  link:       { type: String, required: true },
}, {
  collection: "projects", // matches Mongo collection name
});

const ProjectModel: Model<Project> =
  mongoose.models.Project || mongoose.model<Project>("Project", projectSchema);

export default ProjectModel;

