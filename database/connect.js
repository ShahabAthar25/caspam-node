import mongoose from "mongoose";

export default () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Database connected to MongoDB Atlas");
  });
};
