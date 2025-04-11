import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';
import config from '../../config';

const portfolioDB = mongoose.connection.useDb(config.database_name as string)

const projectSchema = new Schema<TProject>(
  {
    pName: { type: String, required: true },
    pDescription: { type: String, required: true },
    pLangueage: { type: String, required: true },
    pFeatures: { type: [String], required: true },
    gitServerSiteURL: { type: String, required: true },
    gitClientSiteURL: { type: String, required: true },
    liveLinkURL: { type: String, required: true },
  },
  { timestamps: true, versionKey: false, collection: 'projects' },
);

export const Project = portfolioDB.model('projects', projectSchema);
