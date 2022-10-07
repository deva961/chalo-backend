import express from "express";
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/ProgramController.js";
import refreshToken from "../utils/refreshToken.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

// get all programs
router.get("/", getAllPrograms);

//get program by id
router.get("/:id", getProgramById);

// create program
router.post("/:collegeId", verifyToken, createProgram);

//update program
router.put("/:id", verifyToken, updateProgram);

//delete program
router.delete("/:id", verifyToken, deleteProgram);

export default router;
