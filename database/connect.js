import mongoose from "mongoose";

export default () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err)
      return console.log("An error occured while connecting to database");
    console.log("Database connected to MongoDB Atlas");
  });
};
