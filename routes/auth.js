import { Router } from "express";
import { register, login, refresh, logout } from "../controllers/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.delete("/logout", logout);

export default router;
