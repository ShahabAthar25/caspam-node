import { Router } from "express"

const router = Router()

import { register, login, refresh, logout } from "../controllers/auth.js"

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.delete("/logout", logout);

export default router