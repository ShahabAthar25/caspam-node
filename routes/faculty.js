import { Router } from "express";
import { homeView } from "../controllers/faculty.js"

const router = Router()

router.get("/", homeView)

export default router