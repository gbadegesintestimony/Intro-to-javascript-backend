import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/post_controllers.js";

const router = Router();

router.route("/api/v1/posts/create").post(createPost);
router.route("/api/v1/posts/getPosts").get(getPosts);
router.route("/api/v1/posts/update/:id").patch(updatePost);
router.route("/api/v1/posts/delete/:id").delete(deletePost);

export default router;
