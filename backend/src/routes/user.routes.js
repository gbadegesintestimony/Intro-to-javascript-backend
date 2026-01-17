import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user_controllers.js";

const router = Router();

router.route("/api/v1/users/register").post(registerUser);
router.route("/api/v1/users/login").post(loginUser);
router.route("/api/v1/users/logout").post(logoutUser);

export default router;
