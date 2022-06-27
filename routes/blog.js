import { Router } from "express";
import {
  blogView,
  blogDetailView,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} from "../controllers/blog.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", blogView);
router.get("/:id", blogDetailView);
router.post("/", protectedRoute, createBlog);
router.put("/:id", protectedRoute, updateBlog);
router.delete("/:id", protectedRoute, deleteBlog);
router.put("/:id", protectedRoute, likeBlog);

export default router;
