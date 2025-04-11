import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { IUserCreate, TLogin } from './auth.interface';
import config from '../../config';


const portfolioDB = mongoose.connection.useDb(config.database_name as string);

const signUpSchema = new Schema<IUserCreate, TLogin>(
  {
    name: { type: String, required: true,  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    isBlocked: { type: Boolean, default: false, required: true },
    photoURL: { type: String, required:true},
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  },
);
signUpSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const data = this;
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
signUpSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
signUpSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await Signup.findOne({ email }).select('+password');
};

export const Signup = portfolioDB.model<IUserCreate, TLogin>('users', signUpSchema);
