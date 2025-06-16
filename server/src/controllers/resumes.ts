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
    const positions = await Position.find().lean();

    const filePath = req.file?.path;
    if (!filePath) throw new AppError("No file uploaded.", 400);

    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Prompt construction
    const prompt = `
You're a resume evaluator.
Based on the resume text and each job description below, give a matching score between 0 to 100 for each job, where 100 means perfect fit.
Return only the results with a score of 50 or higher.
Format the results as a raw JSON array. No explanation, no markdown — only the array.

Resume:
"""${resumeText}"""

Jobs:
[
${positions
  .map(
    (p) => `  {
    "_id": "${p._id}",
    "title": "${p.title}",
    "department": "${p.department}",
    "description": "${p.description}",
    "requiredSkills": [${p.requiredSkills.map((s) => `"${s}"`).join(", ")}],
    "preferredExperience": "${p.preferredExperience}"
  }`
  )
  .join(",\n")}
]
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const rawContent = completion.choices[0].message?.content?.trim() ?? "[]";

    let scores: { _id: string; score: number }[] = [];

    try {
      // Try parsing raw response content
      scores = JSON.parse(rawContent);
    } catch (e) {
      console.error("❌ Failed to parse OpenAI response:", rawContent);
      throw new AppError("AI response format invalid", 500);
    }

    // Merge results with original positions
    const scoreResults = scores
      .map(({ _id, score }) => {
        const match = positions.find(
          (position) => String(position._id) === _id
        );

        return match ? { ...match, score } : null;
      })
      .filter(Boolean); // remove nulls just in case

    res.status(200).json(scoreResults);
  } catch (error) {
    next(error);
  }
};

export default {
  analyzeResume,
};
