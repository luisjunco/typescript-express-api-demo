// Import with ES Modules
import mongoose, { Schema, model } from "mongoose";

type User = {
  email: string;
  password: string;
  name: string;
};

// new Schema<User>
const userSchema = new Schema<User>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// model<User>
const User = model<User>("User", userSchema);


// Export with ES Modules
export default User;

