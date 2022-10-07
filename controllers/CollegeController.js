import College from "../models/CollegeModel.js";
import Program from "../models/ProgramModel.js";

//Get All Colleges
const getAllColleges = async (req, res, next) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    next(error);
  }
};

//Get All Colleges for admin
const getAllCollegesAdmin = async (req, res, next) => {
  const pageSize = 1;
  const page = Number(req.query.pageNumber) || 1
  try {
    const count = await College.countDocuments();
    const colleges = await College.find().limit(pageSize).skip(pageSize * (page-1));
    res.status(200).json({colleges, page,pages:Math.ceil(count/pageSize)});
  } catch (error) {
    next(error);
  }
};

// Get College By Id
const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    res.status(200).json(college);
  } catch (error) {
    next(error);
  }
};
// getCollegeCourses
const getCollegeCourses = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    const list = await Promise.all(
      college.programs.map((course) => {
        return Program.findById(course);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// create College
const createCollege = async (req, res, next) => {
  const newCollege = new College(req.body);
  try {
    const savedClg = await newCollege.save();
    res.status(200).json(savedClg);
  } catch (error) {
    next(error);
  }
};

//update College
const updateCollege = async (req, res, next) => {
  try {
    const updateCollege = await College.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCollege);
  } catch (error) {
    next(error);
  }
};

//delete college
const deleteCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    await Promise.all(
      college.programs.map((course) => {
        return Program.findByIdAndDelete(course);
      })
    );
    await College.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  getAllColleges,
  getAllCollegesAdmin,
  getCollegeById,
  createCollege,
  updateCollege,
  getCollegeCourses,
  deleteCollege,
};
