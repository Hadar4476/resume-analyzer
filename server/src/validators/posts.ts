import { body } from "express-validator";

const isTitle = () => body("title").trim().isLength({ min: 5 });

const isContent = () => body("content").trim().isLength({ min: 5 });

export const postValidation = [isTitle(), isContent()];
