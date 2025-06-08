import express from "express";
import multer from "multer";

import resumeController from "../controllers/resumes";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/resume", upload.single("resume"), resumeController.analyzeResume);

export default router;
