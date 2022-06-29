import { Router } from "express";
import {
  blogView,
  blogDetailView,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  categoryView,
} from "../controllers/blog.js";

import protectedRoute from "../middleware/protected.js";
import pagination from "../middleware/pagination.js";
import Blog from "../models/Blog.js";

const router = Router();

router.get("/", pagination(Blog, {}), blogView);
router.get("/:id", blogDetailView);
router.get("/category/:category", protectedRoute, categoryView);
router.get("/today", protectedRoute, likeBlog);
router.get("/month", protectedRoute, likeBlog);
router.get("/year", protectedRoute, likeBlog);
router.post("/", protectedRoute, createBlog);
router.put("/:id", protectedRoute, updateBlog);
router.delete("/:id", protectedRoute, deleteBlog);
router.put("/:id/like", protectedRoute, likeBlog);

export default router;
