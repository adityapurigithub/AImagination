import mongoose from "mongoose";

const connectDb = async (url) => {
  mongoose.set("strictQuery", true);

  await mongoose
    .connect(url)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log(err));
};

export default connectDb;
