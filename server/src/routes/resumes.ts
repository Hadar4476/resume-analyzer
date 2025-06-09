import express from "express";
import multer from "multer";

import resumeController from "../controllers/resumes";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), resumeController.analyzeResume);

export default router;
