import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDb from "./db/db.js";

import postAPI from "./routes/postAPI.js";
import dalleAPI from "./routes/dalleAPI.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

try {
  await connectDb(process.env.MONGODB_URL);
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.json({
    msg: "hey from node",
  });
});

app.use("/api/v1/post", postAPI);
app.use("/api/v1/dalle", dalleAPI);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error.bind(err);
  }
  console.log(`Server Up on Port. ${process.env.PORT}`);
});
