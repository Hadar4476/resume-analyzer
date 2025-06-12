import fs from "fs";

import { Response, NextFunction } from "express";
import { CommonRequest } from "../types";
import { OpenAI } from "openai";
import pdfParse from "pdf-parse";

import config from "../config";

import Position from "../models/position";

import AppError from "../error";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

const analyzeResume = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const positions = await Position.find();

    const filePath = req.file?.path;

    if (!filePath) throw new AppError("No file uploaded.", 400);

    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    const scoreResults = [];

    for (const position of positions) {
      const prompt = `
    You're a resume evaluator. Based on the resume text and the job description below, give a matching score between 0 to 100, where 100 means perfect fit. Only return the number.

    Job Title: ${position.title}
    Department: ${position.department}
    Description: ${position.description}
    Required Skills: ${position.requiredSkills.join(", ")}
    Preferred Experience: ${position.preferredExperience}

    Resume:
    """${resumeText}"""
          `.trim();

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      });

      const scoreText = completion.choices[0].message?.content?.trim();

      const score = parseInt(scoreText ?? "0", 10);
      if (isNaN(score)) throw new AppError("Invalid score from GPT", 500);

      scoreResults.push({
        ...position,
        score,
      });
    }

    res.status(200).json(scoreResults);
  } catch (error) {
    next(error);
  }
};

export default {
  analyzeResume,
};
