import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },  
    state: { type: String, required: true }, 
    country: { type: String, required: true }, // ✅ New Country Field
    ranking: { type: Number, required: true },
    brochure: { type: String, required: true },
    image: { type: String, required: true },
    collegeInfo: { type: String, required: true },
    stream: { 
        type: String, 
        required: true, 
        enum: ["Engineering", "Medical", "Law", "Graduation"] // ✅ Restrict to valid values
    },
});

const College = mongoose.model("College", CollegeSchema);
export default College;
