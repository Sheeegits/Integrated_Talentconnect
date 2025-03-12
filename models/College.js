import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },  // ✅ Separate City Field
    state: { type: String, required: true }, // ✅ Separate State Field
    ranking: { type: Number, required: true },
    brochure: { type: String, required: true },
    image: { type: String, required: true },
    collegeInfo: { type: String, required: true },
  });
const College = mongoose.model("College", CollegeSchema);
export default College;