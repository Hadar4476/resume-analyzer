import express from "express";

import { validate } from "../middleware/validate";
import { postValidation } from "../validators/posts";

import checkAuthentication from "../middleware/auth";

import postController from "../controllers/posts";

const router = express.Router();

router.get("/", checkAuthentication, postController.getPosts);

router.get("/:postId", checkAuthentication, postController.getPostById);

router.post(
  "/",
  checkAuthentication,
  postValidation,
  validate,
  postController.createPost
);

router.put(
  "/:postId",
  checkAuthentication,
  postValidation,
  validate,
  postController.updatePost
);

router.delete("/:postId", checkAuthentication, postController.deletePost);

export default router;
