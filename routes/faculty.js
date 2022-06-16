import { Router } from "express";
import { homeView, createFaculty } from "../controllers/faculty.js";

const router = Router();

router.get("/", homeView);
router.get("/", createFaculty);

export default router;
