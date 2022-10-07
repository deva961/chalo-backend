import express from "express";
import {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  getCollegeCourses,
  deleteCollege,
  getAllCollegesAdmin,
} from "../controllers/CollegeController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

//get all colleges
router.get("/", getAllColleges);


router.get("/admin", getAllCollegesAdmin);


//get college by id
router.get("/:id", getCollegeById);

//get all courses of college by college id
router.get("/course/:id", getCollegeCourses);

//create college
router.post("/",createCollege);

//update college
router.put("/:id", verifyToken, updateCollege);

//delete college
router.delete("/:id", verifyToken, deleteCollege);

export default router;
