import mongoose, { Document, Schema } from "mongoose";

enum Depatment {
  ENGINEERING = "engineering",
  INFRASTRUCTURE = "infrastructure",
  QUALITY_ASSURANCE = "qualityAssurance",
  DESIGN = "design",
}

interface IPosition extends Document {
  title: string;
  department: Depatment;
  description: string;
  requiredSkills: string[];
  preferredExperience: string;
}

const positionSchems: Schema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], required: true },
    preferredExperience: { type: String, required: true },
  },
  { timestamps: true }
);

const Position = mongoose.model<IPosition>("Position", positionSchems);

export default Position;
