// Import with ES Modules
import { Schema, model, InferSchemaType } from "mongoose";


const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});


type UserType = InferSchemaType<typeof userSchema>;
const User = model("User", userSchema);


// Export with ES Modules
export {UserType}; // named export 
export default User; // default export
