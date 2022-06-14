import jwt from "jsonwebtoken";

export default (payload) => {
  // genrating a json web token
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
