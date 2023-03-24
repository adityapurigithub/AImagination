import express from "express";

import * as dotenv from "dotenv";

import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.js";

dotenv.config();

const router = express.Router();

// Cloudinary....Configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

//create all post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Upload on cloudinary......
    const photoURL = await cloudinary.uploader.upload(photo);

    //creating a new post in db...................
    const newPost = new Post({
      name,
      prompt,
      photo: photoURL.url,
    });

    await newPost.save();
    // ..............

    //201 means created a new resource...
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err,
    });
  }
});

//get all post
router.route("/").get(async (req, res) => {
  try {
    const post = await Post.find({}).sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err,
    });
  }
});

export default router;
