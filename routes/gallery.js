import { Router } from "express";
import {
  galleryView,
  createMoment,
  updateMoment,
  deleteMoment,
} from "../controllers/gallery.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", galleryView);
router.post("/", protectedRoute, createMoment);
router.put("/:id", protectedRoute, updateMoment);
router.delete("/:id", protectedRoute, deleteMoment);

export default router;
