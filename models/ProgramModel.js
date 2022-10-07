import mongoose from "mongoose";
const { Schema } = mongoose;

const ProgramSchema = new Schema(
  {
    name: { type: String, required: true },
    college_id: { type: String },
    college_name: { type: String },
    college_city: { type: String },
    college_province: { type: String },
    college_country: { type: String },
    college_logo: { type: String },
    course_desc: { type: String },
    duration: { type: String },
    category: { type: String },
    tuition_fee: { type: String },
    app_fee: { type: String },
    course_intakes: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Program", ProgramSchema);
