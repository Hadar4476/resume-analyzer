import { NextFunction, Request, Response } from "express";
import { CommonRequest } from "../types";

import Post from "../models/post";

import AppError from "../error";

const getPosts = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by latest

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new AppError("Resource not found", 404);
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({ title, content });

    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new AppError("Resource not found", 404);
    }

    post.title = title;
    post.content = content;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (
  req: CommonRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new AppError("Resource not found", 404);
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ postId });
  } catch (error) {
    next(error);
  }
};

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
