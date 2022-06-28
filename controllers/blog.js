import Blog from "../models/Blog.js";
import { createBlogValidation } from "../utils/validation.js";
import moment from "moment";

export const blogView = async (req, res) => {
  try {
    const active = "blog";
    const page = parseInt(req.query.page);

    if (!page) {
      res.redirect("/blog?page=1");
    }

    const limit = 6;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (page === 1 && endIndex >= (await Blog.countDocuments())) {
      results.page = undefined;
    } else {
      results.page = page;
    }

    if (endIndex < (await Blog.countDocuments())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.blogs = await Blog.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: "desc" });

    const today = await Blog.find({
      day: moment().format("Do"),
      month: moment().format("MMMM"),
      year: moment().format("YYYY"),
    });

    const month = await Blog.find({
      month: moment().format("MMMM"),
      year: moment().format("YYYY"),
    });

    const year = await Blog.find({
      year: moment().format("YYYY"),
    });

    res.render("blog/blog", { results, active, today, month, year });
  } catch (error) {
    console.log(error);
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
    const titleExist = await Blog.findOne({ title: req.body.title });
    if (titleExist) return res.status(400).json("Title already exists");

    // creating facility
    const newBlog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      image: req.body.image,
      category: req.body.category,
      createdBy: req.user.username,
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
    // finding blog
    const blog = await Blog.findById(req.params.id);

    // if blog does not exist then returning a 404(object not found) error
    if (!blog) return res.status(404).json("No blogs found");

    // updating blog member
    await blog.updateOne({
      $set: req.body,
    });

    res.json("Blog updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    // finding blog
    const blog = await Blog.findById(req.params.id);

    // if blog does not exist then returning a 404(object not found) error
    if (!blog) return res.status(404).json("No blog found");

    // deleting blog
    await blog.deleteOne();

    res.json("Blog successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likeBlog = async (req, res) => {
  try {
    // getting blog
    const blog = await Blog.findById(req.params.id);

    // checking if the user has already liked the blog
    if (!blog.likes.includes(req.user._id)) {
      // adding user id to the likes array
      await blog.updateOne({
        $push: { likes: req.user._id },
      });

      res.json(`Liked blog`);
    } else {
      // removing user id from likes array
      await blog.updateOne({
        $pull: { likes: req.user._id },
      });

      res.json(`Removed Like`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
