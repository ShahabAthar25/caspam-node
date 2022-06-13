import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { registerValidation, loginValidation } from "../utils/validation";
import User from "../models/User";
import RefreshToken from "../models/RefreshToken";
import generateAccessToken from "../utils/generateAccessToken";

export const register = async (req, res) => {
  // Validating Request
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) return res.status(400).json("Username already exists");

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json("Email already exists");

    // genrate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // creating new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // saving user
    const user = await newUser.save();
    res.json("User registered successfully");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  // Validating Request
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // checking if email is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Invalid email or password");

    // checking if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).json("Invalid email or password");

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      likedPost: user.likedPosts,
      karma: user.karma,
    };

    // creating an access token
    const accessToken = generateAccessToken(payload);

    // creating a refresh token
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    // Adding refresh token to database
    const newRefreshToken = RefreshToken({
      refreshToken: refreshToken,
    });

    // Commiting changes to database
    await newRefreshToken.save();

    // Sending user info
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      joinedSubReddits: user.joinedSubReddits,
      karma: user.karma,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const refresh = async (req, res) => {
  try {
    // getting refresh token from req.body
    const refreshToken = req.body.token;

    // if refresh token is none then sending a 400(bad request) response
    if (refreshToken == null) return res.sendStatus(400);

    // finding refresh token in database to see if the user is logged in
    const _refreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
    });

    // checking if refresh token is in the database, if not, then sending
    // a 403(forbidden) response
    if (!_refreshToken) return res.sendStatus(403);

    // verifying the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      // if any error then send a 403(forbidden) response
      if (err) return res.sendStatus(403);

      // defining the data inside the access token
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        likedPost: user.likedPosts,
        karma: user.karma,
      };

      // creating access token with user data
      const accessToken = generateAccessToken(payload);

      // sending access token back
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const logout = async (req, res) => {
  try {
    // if the token is none then sending a 400(bad request) response
    if (!req.body.token) return res.sendStatus(400);

    // finding and deleting the refresh token
    await RefreshToken.findOneAndDelete({ refreshToken: req.body.token });

    // sending user the acknowledgement of logout
    res.json("Successfully loggedout");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
