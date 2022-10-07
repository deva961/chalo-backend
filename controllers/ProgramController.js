import College from "../models/CollegeModel.js";
import Program from "../models/ProgramModel.js";

//get all programs
const getAllPrograms = async (req, res, next) => {
  const { mintuition, maxtuition, minappFee, maxappFee, ...others } = req.query;
  try {
    const programs = await Program.find({
      ...others,
      tuition_fee: { $gte: (mintuition - 1) | 1, $lte: maxtuition || 50000 },
      app_fee: { $gte: minappFee | 1, $lte: maxappFee || 50000 },
    });
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
};

//get programs by Id
const getProgramById = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id);
    res.status(200).json(program);
  } catch (error) {
    next(error)
  }
};

//create program
const createProgram = async (req, res, next) => {
  const collegeId = req.params.collegeId;
  const newProgram = new Program(req.body);
  try {
    const savedProgram = await newProgram.save();
    try {
      await College.findByIdAndUpdate(collegeId, {
        $push: { programs: savedProgram._id },
      });
    } catch (error) {
      res.json(error);
    }
    res.status(200).json(savedProgram);
  } catch (error) {
    next(error)
  }
};

//update College
const updateProgram = async (req, res, next) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProgram);
  } catch (error) {
    next(error);
  }
};

// deleteCourse
const deleteProgram = async (req, res, next) => {
  const collegeId = req.params.collegeid;
  try {
    await Program.findByIdAndDelete(req.params.id);
    try {
      await College.findByIdAndUpdate(collegeId, {
        $pull: { programs: req.params.id },
      });
    } catch (error) {
      res.json(error);
    }
    res.status(200).json("Program has been deleted");
  } catch (error) {
    next(error);
  }
};

export {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
