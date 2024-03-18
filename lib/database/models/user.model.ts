import { Schema, model, models } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  planId: number;
  creditBalance: number;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: URL, required: true, },
  firstName: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10 },
});

const User = models?.User || model("User", UserSchema);

export default User;
