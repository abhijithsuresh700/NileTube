import express from "express";
import { addVideo, deleteVideo, getByTag, getVideo, random, search, sub, trend } from "../controllers/videoController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//create a video
router.post("/",  addVideo)
router.put("/:id", addVideo)
router.delete("/:id", deleteVideo)
router.get("/find/:id", getVideo)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub/:id", sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;