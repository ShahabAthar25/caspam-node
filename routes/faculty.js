import { Router } from "express";
import {
  homeView,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/faculty.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", homeView);
router.post("/", protectedRoute, createFaculty);
router.put("/:id", protectedRoute, updateFaculty);
router.delete("/:id", protectedRoute, deleteFaculty);

export default router;
