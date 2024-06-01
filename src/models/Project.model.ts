// Import with ES Modules
import { Schema, model, InferSchemaType } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  // owner will be added later on
});



type ProjectType = InferSchemaType<typeof projectSchema>;
const Project = model("Project", projectSchema);


// Export with ES Modules
export {ProjectType}; // named export 
export default Project; // default export