import express from "express";

import * as dotenv from "dotenv";

import { Configuration, OpenAIApi } from "openai";

import Post from "../models/post.js";

dotenv.config();

const router = express.Router();

//setup config by adding key,etc..
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//create a new instance of OpenAiAPi...passing it config as param
const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  console.log("hi");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    //for getting the img out of AIresp...
    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({
      image,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
