import { Document } from "mongoose";

export interface TBlogPost extends Document {
    bTitle: string;
    bDescription: string;
    likeCount: number;
    commentsCount: number;
    commentsInfo: {
      name: string;
      email: string;
      photo: string;
    }[];
    publisherInfo: {
      name: string;
      email: string;
      photo: string;
    };
  }
  