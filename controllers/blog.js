import Blog from "../models/Blog.js";
import { createBlogValidation } from "../utils/validation.js";

export const blogView = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const blogDetailView = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBlog = async (req, res) => {
  // Validating Request
  const { error } = createBlogValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // creating facility
    const newBlog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      image: req.body.image,
      categorie: req.body.category,
    });

    // saving facility to database and storing it in an variable
    const blog = await newBlog.save();

    // returning facility to user
    res.json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateBlog = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likeBlog = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};
