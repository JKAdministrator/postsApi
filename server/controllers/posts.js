import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successgully" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => {
      return id === String(req.userId);
    });
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes.filter((id) => {
        return id !== String(req.userId);
      });
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};
