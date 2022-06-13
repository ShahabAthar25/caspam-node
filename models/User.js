import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 60,
  },
  email: {
    type: String,
    require: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  }
});

export default mongoose.model("User", userSchema);