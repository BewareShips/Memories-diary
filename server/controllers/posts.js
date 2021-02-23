const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const postMessage = require("../models/postMessages");

const getPosts = async (req, res) => {
  try {
    const allPostMsg = await postMessage.find();
    res.status(200).json(allPostMsg);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, message, creator, tags, selectedFile } = req.body;

  try {
    const newPost = await new postMessage({
      title,
      message,
      creator,
      tags,
      selectedFile,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, tags, selectedFile } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }
    const updatedPost = {
      title,
      message,
      creator,
      tags,
      selectedFile,
      _id: id,
    };
    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }
    await postMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }
    const post = await postMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
