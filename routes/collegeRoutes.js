// import express from "express";

import {
  addColleges,
  getColleges,
  updateCollege,
} from "../controllers/collegeController.js";
import {
  addCourse,
  getCoursesByCollege,
  updateCourse,
} from "../controllers/courseController.js";
import {
  addFaculty,
  getFacultyByCollege,
  updateFaculty,
} from "../controllers/facultyController.js";
import {
  addPlacementData,
  getPlacementByCollege,
  updatePlacement,
} from "../controllers/placementController.js";
import upload from "../middlewares/upload.js"; // ✅ Only One Import
import validateCollege from "../middlewares/validateCollege.js";
import {
  addAdmissionProcess,
  getAdmissionProcessByCollege,
  updateAdmissionProcess,
} from "../controllers/admissionProcessController.js";
import {
  addHostel,
  getHostelByCollege,
  updateHostel,
} from "../controllers/hostelController.js";
import {
  addCampus,
  getCampusByCollege,
  updateCampus,
} from "../controllers/campusController.js";
import { filterColleges } from "../controllers/collegeFilterController.js"; // ✅ Import new filter controller

const router = express.Router();

// ✅ Apply `upload` only for `/add`
router.post(
  "/add",
  upload.fields([{ name: "image" }, { name: "brochure" }]),
  validateCollege,
  addColleges
);
router.get("/all", getColleges);
router.put("/update/:collegeId", updateCollege);

// ✅ Courses & Fees Routes
router.post("/courses/add", addCourse);
router.get("/courses/:collegeId", getCoursesByCollege);
router.put("/courses/update/:courseId", updateCourse);

// ✅ Faculty Routes
router.post("/faculty/add", addFaculty);
router.get("/faculty/:collegeId", getFacultyByCollege);
router.put("/faculty/update/:facultyId", updateFaculty);

// ✅ Placement Routes
router.post("/placement/add", addPlacementData);
router.get("/placement/:collegeId", getPlacementByCollege);
router.put("/placement/update/:placementId", updatePlacement);

// ✅ Admission Process Routes
router.post("/admission/add", addAdmissionProcess);
router.get("/admission/:collegeId", getAdmissionProcessByCollege);
router.put("/admission/update/:admissionProcessId", updateAdmissionProcess);

// ✅ Hostel Routes
router.post(
  "/hostel/add",
  upload.fields([
    { name: "photos", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  addHostel
);
router.get("/hostel/:collegeId", getHostelByCollege);
router.put(
  "/hostel/update/:hostelId",
  upload.fields([{ name: "photos" }, { name: "videos" }]),
  updateHostel
);

//Campus Routes
router.post(
  "/campus/add",
  upload.fields([
    { name: "photos", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  addCampus
);
router.get("/campus/:collegeId", getCampusByCollege);
router.put(
  "/campus/update/:campusId",
  upload.fields([{ name: "photos" }, { name: "videos" }]),
  updateCampus
);

//filter api
router.get("/filter", filterColleges);

// const {
//   registerUser,
//   loginUser,
//   userDetails,
//   registerCollege,
//   loginCollege,
//   studentdetails,
//   reviewdetails,
//   cutoffdetails,
//   scholarshipdetails,
// } = require("../userController/index");

// const {
//   studentRegisterValidate,
//   studentLoginValidate,
//   collegeRegisterValidate,
//   collegeLoginValidate,
//   studentdetailsValidate,
//   reviewsValidate,
//   cutoffsValidate,
//   scholarshipsValidate,
// } = require("../utils/userValidation");

// router.post("/register", studentRegisterValidate, registerUser);
// router.post("/login", studentLoginValidate, loginUser);
// router.post("/collegeregister", collegeRegisterValidate, registerCollege);
// router.post("/collegelogin", collegeLoginValidate, loginCollege);
// router.post("/studentdetails", studentdetailsValidate, studentdetails);
// router.post("/reviews", reviewsValidate, reviewdetails);
// router.post("/cutoffs", cutoffsValidate, cutoffdetails);
// router.post("/scholarships", scholarshipsValidate, scholarshipdetails);

// module.exports = router;

// ---------------------------------------------------------------------------------------

import {
  registerUser,
  loginUser,
  // userDetails,
  registerCollege,
  loginCollege,
  studentdetails,
  reviewdetails,
  cutoffdetails,
  addCollege,
  getCollegeByCountry,
  addCollegecountry,
  scholarshipdetails,
  getCollege,
} from "../controllers/index.js";

import {
  studentRegisterValidate,
  studentLoginValidate,
  collegeRegisterValidate,
  collegeLoginValidate,
  filterValidation,
  filterValidationcountry,
  studentdetailsValidate,
  reviewsValidate,
  // getCollegeByCountry,
  cutoffsValidate,
  scholarshipsValidate,
} from "../middlewares/userValidation.js";
// const router = express.Router();
import express from "express";

//Akkshit Routes
router.post("/register", studentRegisterValidate, registerUser);
router.post("/login", studentLoginValidate, loginUser);
router.post("/collegeregister", collegeRegisterValidate, registerCollege);
router.post("/collegelogin", collegeLoginValidate, loginCollege);
router.post("/studentdetails", studentdetailsValidate, studentdetails);
router.post("/reviews", reviewsValidate, reviewdetails);
router.post("/cutoffs", cutoffsValidate, cutoffdetails);
router.post("/scholarships", scholarshipsValidate, scholarshipdetails);

// for filtering ranks
router.post("/filterranks", filterValidation, addCollege);
router.get("/getfilteredranks", getCollege);

// for filtering country
router.post("/filteredcountry", filterValidationcountry, addCollegecountry);
router.get("/getfilteredcountry", getCollegeByCountry);

export default router;
