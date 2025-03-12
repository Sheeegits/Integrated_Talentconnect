import Course from "../models/Course.js";
import College from "../models/College.js";


export const addCourse = async (req, res) => {
    try {
        const { collegeId, courseName, duration, fees } = req.body;

        const college = await College.findById(collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
          }

    const newCourse = new Course({ collegeId, courseName, duration, fees});
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
    };
export const getCoursesByCollege = async (req, res) => {
    try {
        const { collegeId } = req.params;
        const college = await College.findById(collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
          }
    const courses = await Course.find({collegeId});
    res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
    };

    export const updateCourse = async (req, res) => {
      try {
        const { courseId } = req.params;
        const { courseName, duration, fees } = req.body;
    
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { courseName, duration, fees },
          { new: true }
        );
    
        if (!updatedCourse) {
          return res.status(404).json({ message: "Course not found" });
        }
    
        res.status(200).json({ message: "Course details updated", course: updatedCourse });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
    };
