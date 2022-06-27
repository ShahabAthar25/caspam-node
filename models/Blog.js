import mongoose from "mongoose";
import moment from "moment";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  snippet: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: moment().format("MMMM Do, YYYY"),
  },
  likes: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Blog", blogSchema);
