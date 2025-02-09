import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUserCreate, TLogin } from './auth.interface';
import config from '../../config';

const signUpSchema = new Schema<IUserCreate, TLogin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], required: true },
    isBlocked: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: false, required: true },
    photoURL: { type: String, required:true},
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'a4-user',
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

export const Signup = model<IUserCreate, TLogin>('a4-user', signUpSchema);
