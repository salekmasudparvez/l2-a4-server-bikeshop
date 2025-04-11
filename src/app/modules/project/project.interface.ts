import { Document } from "mongoose";

export interface TProject extends Document {
  pName: string;
  pDescription: string;
  pLangueage: string;
  pFeatures: string[];
  gitServerSiteURL: string;
  gitClientSiteURL: string;
  liveLinkURL: string;
}
