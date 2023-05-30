import { Router } from "express";
import {  addComment, deleteComment, getComments } from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = new Router();

// router.post("/", verifyToken, addComment)
router.post("/", addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

export default router;