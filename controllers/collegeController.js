import mongoose from "mongoose";
import College from "../models/College.js";

// ✅ Add College
export const addColleges = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received Files:", req.files);

    // ✅ Normalize keys in req.body
    const body = Object.keys(req.body).reduce((acc, key) => {
      acc[key.toLowerCase()] = req.body[key]; // Convert all keys to lowercase
      return acc;
    }, {});

    // ✅ Extract fields from normalized body
    const name = body.name;
    const city = body.city;
    const state = body.state;
    const ranking = body.ranking;
    const collegeInfo = body.collegeinfo || body.collegeInfo; // Handle both cases

    // ✅ Extract file URLs from `req.files`
    const image = req.files?.image ? req.files.image[0].path : null;
    const brochure = req.files?.brochure ? req.files.brochure[0].path : null;

    // ✅ Validate all required fields
    if (!name || !state || !city || !ranking || !collegeInfo || !image || !brochure) {
      return res.status(400).json({
        message: "All fields (name, city, state, ranking, collegeInfo, image, brochure) are required",
      });
    }

    // ✅ Create new college entry
    const newCollege = new College({
      name,
      city,
      state,
      ranking,
      collegeInfo,
      image,
      brochure,
    });

    await newCollege.save();

    res.status(201).json({
      message: "College added successfully",
      college: newCollege,
    });

  } catch (error) {
    console.error("Error adding college:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.toString(),
    });
  }
};  

// ✅ Get All Colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update College
export const updateCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    // ✅ Validate College ID
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid College ID format" });
    }

    const { name, state, city, ranking, collegeInfo } = req.body;

    // ✅ Handle file updates (if new images are uploaded)
    const image = req.files?.image ? req.files.image[0].path : undefined;
    const brochure = req.files?.brochure ? req.files.brochure[0].path : undefined;

    // ✅ Update the college (only update provided fields)
    const updatedCollege = await College.findByIdAndUpdate(
      collegeId, 
      { name, state, city, ranking, collegeInfo, ...(image && { image }), ...(brochure && { brochure }) }, 
      { new: true, runValidators: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({
      message: "College details updated successfully",
      college: updatedCollege,
    });

  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


