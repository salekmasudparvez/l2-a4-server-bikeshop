import mongoose, { Schema } from "mongoose";
import { TContact } from "./contact.interface";
import config from "../../config";

const portfolioDB = mongoose.connection.useDb(config.database_name as string)

const contactSchema = new Schema<TContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    markAsRead: { type: Boolean, default: false },
  },
  { timestamps: true, 
    collection:'contact',
    versionKey:false
  }
);

export const Contact = portfolioDB.model("contact", contactSchema);
