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
  monthView,
  yearView,
} from "../controllers/blog.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", blogView);
router.get("/:id", blogDetailView);
router.get("/category/:category", categoryView);
router.get("/archives/today", dayView);
router.get("/archives/month", monthView);
router.get("/archives/year", yearView);
router.post("/", protectedRoute, createBlog);
router.put("/:id", protectedRoute, updateBlog);
router.delete("/:id", protectedRoute, deleteBlog);
router.put("/:id/like", protectedRoute, likeBlog);

export default router;
