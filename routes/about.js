import { Router } from "express";
import { aboutView } from "../controllers/about.js";

const router = Router();

router.get("/", aboutView);

export default router;
