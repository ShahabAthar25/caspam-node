import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    require: true,
  },
});

export default mongoose.model("refreshToken", refreshTokenSchema);
