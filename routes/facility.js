import { Router } from "express";
import {
  facilityView,
  facilityDetailView,
  createFacility,
  updateFacility,
  deleteFacility,
} from "../controllers/facility.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", facilityView);
router.get("/:id", facilityDetailView);
router.post("/", protectedRoute, createFacility);
router.put("/:id", protectedRoute, updateFacility);
router.delete("/:id", protectedRoute, deleteFacility);

export default router;
