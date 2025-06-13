enum Depatment {
  ENGINEERING = "engineering",
  INFRASTRUCTURE = "infrastructure",
  QUALITY_ASSURANCE = "qualityAssurance",
  DESIGN = "design",
}

export interface IPosition {
  _id: string;
  title: string;
  department: Depatment;
  description: string;
  requiredSkills: string[];
  preferredExperience: string;
  score: number;
}
