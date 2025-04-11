import mongoose, { Schema } from "mongoose";
import { TBlogPost } from "./blog.interface";
import config from "../../config";

const profileDB = mongoose.connection.useDb(config.database_name as string)
const blogPostSchema = new Schema<TBlogPost>({
    bTitle: { type: String, required: true },
    bDescription: { type: String, required: true },
    likeCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    commentsInfo: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        photo: { type: String, required: true }
      }
    ],
    publisherInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      photo: { type: String, required: true }
    },
   
  },{
    versionKey:false,
    collection:"blogs",
    timestamps:true
  });
  
  export const Blogs = profileDB.model("Blogs", blogPostSchema);