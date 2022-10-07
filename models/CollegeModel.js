import mongoose from "mongoose";
const { Schema } = mongoose;

const CollegeSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    logo: { type: String },
    year_of_est: { type: String },
    dli_number: { type: String },
    institution_type: { type: String },
    address: { type: String },
    brochure: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    photos: { type: [String] },
    programs: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("College", CollegeSchema);
