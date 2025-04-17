import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  UserModel,
  CollegeAuthModel,
  ReviewModel,
  CutoffModel,
  ScholarshipModel,
} from "../models/userModel.js";
//register user api

export const userDetails = async (req, res) => {
  try {
    const { name, location, ranking, averagepackage } = req.body;

    const college = new CollegeModel({
      name,
      location,
      ranking,
      averagepackage,
    });

    await college.save();

    return res
      .status(201)
      .json({ message: "College details saved successfully", college });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};



   

   
      


export const reviewdetails = async (req, res) => {
  try {
    const { studentemail, rating, reviewtext, pros, cons } = req.body;
    const review = new ReviewModel({
      studentemail,
      rating,
      reviewtext,
      pros,
      cons,
    });
    const savedReview = await review.save();

    res.status(201).json({
      message: "Review Added Successfully",
      review: savedReview,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const cutoffdetails = async (req, res) => {
  try {
    const {
      collegename,
      coursename,
      examname,
      category,
      quota,
      cutoffrank,
      admissionyear,
    } = req.body;
    const review = new CutoffModel({
      collegename,
      coursename,
      examname,
      category,
      quota,
      cutoffrank,
      admissionyear,
    });
    const savedReview = await review.save();
    return res.status(201).json({
      message: "Cutoffs Added Successfully",
      review: savedReview,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const scholarshipdetails = async (req, res) => {
  try {
    const { ScholarshipName, ScholarshipMoney, ScholarshipDescription } =
      req.body;
    const scholarships = new ScholarshipModel({
      ScholarshipName,
      ScholarshipMoney,
      ScholarshipDescription,
    });
    const savedReview = await scholarships.save();
    return res.status(201).json({
      message: "Scholarships Added Successfully",
      review: savedReview,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

