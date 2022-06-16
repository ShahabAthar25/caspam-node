import dotenv from "dotenv";

import authTest from "./authTest.js";
import isAuth from "./isAuth.js";

dotenv.config();

let authMiddleware = null;

if (process.env.STATE == "PRODUCTION") {
  authMiddleware = isAuth;
} else {
  authMiddleware = authTest;
}

export default authMiddleware;
