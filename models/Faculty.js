import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  degree: {
    type: String,
    require: true,
  },
  facebook: {
    type: String,
    require: true,
  },
  twitter: {
    type: String,
    require: true,
  },
  linkedin: {
    type: String,
    require: true,
  },
  gmail: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

export default mongoose.model("faculty", facultySchema);
