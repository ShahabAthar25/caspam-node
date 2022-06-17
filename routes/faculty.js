import { Router } from "express";
import { homeView, createFaculty } from "../controllers/faculty.js";

import protectedRoute from "../middleware/protected.js";

const router = Router();

router.get("/", homeView);
router.post("/", protectedRoute, createFaculty);

export default router;
