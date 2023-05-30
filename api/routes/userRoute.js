import { Router } from "express";
import { addToHistory, deleteUser, dislike, getUser, historyVideos, like, saveVideo, savedVideos, subscribe, unsaveVideo, unsubscribe, update } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = new Router();




//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:channelId/:userId",subscribe);

//unsubscribe a user
router.put("/unsub/:channelId/:userId", unsubscribe);

//like a video
router.put("/like/:videoId/:userId",  like);

//dislike a video
router.put("/dislike/:videoId/:userId", dislike);

//save a video
router.put("/saveVideo/:videoId/:userId", saveVideo);

//unsave a video
router.put("/unsaveVideo/:videoId/:userId", unsaveVideo);

//saved  videos
router.get("/savedVideos/:id", savedVideos);

// add to history
router.put("/addHistory/:videoId/:userId", addToHistory);

//history videos
router.get("/historyVideos/:id", historyVideos);


export default router;