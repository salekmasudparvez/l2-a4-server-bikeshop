import mongoose, { Schema } from "mongoose";
import { Iskill } from "./skill.interface";
import config from "../../config";

const portfolioDB = mongoose.connection.useDb(config.database_name as string);

const signUpSchema = new Schema<Iskill>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'skillDB',
  },
);

export const Skill = portfolioDB.model<Iskill>('skillDB', signUpSchema);