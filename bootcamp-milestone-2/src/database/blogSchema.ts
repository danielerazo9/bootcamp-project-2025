import mongoose, { Schema } from "mongoose";

// typescript type (can also be an interface)
type Blog = {
		title: string;
	  slug: string; 
		date: Date;
		description: string; // for preview
	  content: string; // text content for individual blog page
	  image: string; // url for string in public
	  image_alt: string; // alt for image
		comments: IComment[]; // array for comments
};


// mongoose schema 
const blogSchema = new Schema<Blog>({
		title: { type: String, required: true },
		slug: { type: String, required: true },
		date: { type: Date, required: false, default: new Date()},
		description: { type: String, required: true },
		image: { type: String, required: true },
	  image_alt: { type: String, required: true },
		content: { type: String, required: true },
})

// defining the collection and model
const Blog = mongoose.models['blogs'] ||
    mongoose.model('blogs', blogSchema);

export default Blog;