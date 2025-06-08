import { Response } from "express";
import { spawn } from "child_process";
import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";

import { NextFunction } from "express";
import { CommonRequest } from "../types";
import AppError from "../error";

const analyzeResume = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      throw new AppError("No file uploaded.", 400);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const parsedData = await pdfParse(dataBuffer);
    const resumeText = parsedData.text;

    const scriptPath = path.join(
      __dirname,
      "../../../python/src/analyze_resume.py"
    );

    const python = spawn("python3", [scriptPath]);
    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        throw new AppError("Python script failed.", 500);
      }

      try {
        const result = JSON.parse(output);
        res.json({ result });
      } catch (e) {
        res.status(500).json({ error: "Failed to parse Python output." });
      }
    });

    // Send resume text to Python script
    python.stdin.write(resumeText);
    python.stdin.end();
  } catch (error) {
    next(error);
  }
};

export default {
  analyzeResume,
};
