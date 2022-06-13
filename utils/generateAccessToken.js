import jwt from "jsonwebtoken";

module.exports = (payload) => {
  // genrating a json web token
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
