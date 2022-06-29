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

const router = Router();

router.get("/", blogView);
router.get("/:id", blogDetailView);
router.get("/category/:category", categoryView);
router.get("/today", likeBlog);
router.get("/month", likeBlog);
router.get("/year", likeBlog);
router.post("/", protectedRoute, createBlog);
router.put("/:id", protectedRoute, updateBlog);
router.delete("/:id", protectedRoute, deleteBlog);
router.put("/:id/like", protectedRoute, likeBlog);

export default router;
