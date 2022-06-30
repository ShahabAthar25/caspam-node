import { Router } from "express";
import {
  blogView,
  blogDetailView,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  categoryView,
  dayView,
} from "../controllers/blog.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", blogView);
router.get("/archives/today", dayView);
router.get("/archives/month", likeBlog);
router.get("/archives/year", likeBlog);
router.get("/:id", blogDetailView);
router.get("/category/:category", categoryView);
router.post("/", protectedRoute, createBlog);
router.put("/:id", protectedRoute, updateBlog);
router.delete("/:id", protectedRoute, deleteBlog);
router.put("/:id/like", protectedRoute, likeBlog);

export default router;
