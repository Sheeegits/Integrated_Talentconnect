import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true},
        courseName : { type: String, required: true},
        duration: { type: String, required: true },
        fees: { type: Number, required: true },
        
    },
    { timestamps: true}
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;