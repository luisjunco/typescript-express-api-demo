// Import with ES Modules
import { Schema, model, InferSchemaType } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});


type TaskType = InferSchemaType<typeof taskSchema>;
const Task = model("Task", taskSchema);


// Export with ES Modules
export {TaskType}; // named export 
export default Task; // default export
