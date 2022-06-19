import mongoose from "mongoose";

const facilitySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  snippet: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

export default mongoose.model("facility", facilitySchema);
