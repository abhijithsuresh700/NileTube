import { createError } from "../utils/error.js";
import Video from "../models/videoModel.js";
import User from "../models/userModel.js"

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };
  
  export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can delete only your account!"));
    }
  };
  
  export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  export const subscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $addToSet: { subscribedUsers: req.params.channelId },
      });
      await User.findByIdAndUpdate(req.params.channelId, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      next(err);
    }
  };
  
  export const unsubscribe = async (req, res, next) => {
    try {
      try {
        await User.findByIdAndUpdate(req.params.userId, {
          $pull: { subscribedUsers: req.params.channelId },
        });
        await User.findByIdAndUpdate(req.params.channelId, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  };
  
  export const like = async (req, res, next) => {
    const id = req.params.userId;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{disLikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };
  
  export const dislike = async (req, res, next) => {
      const id = req.params.userId;
      const videoId = req.params.videoId;
      try {
        await Video.findByIdAndUpdate(videoId,{
          $addToSet:{disLikes:id},
          $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
      next(err);
    }
  };


    export const saveVideo = async (req, res, next) => {
    const userId = req.params.userId;
    const videoId = req.params.videoId;
    try {
      await User.findByIdAndUpdate(userId,{
        $addToSet:{savedVideos:videoId},
      })
      res.status(200).json("The video has been saved.")
    } catch (err) {
      next(err);
    }
  };

    export const unsaveVideo = async (req, res, next) => {
    const userId = req.params.userId;
    const videoId = req.params.videoId;
    try {
      await User.findByIdAndUpdate(userId,{
        $pull:{savedVideos:videoId},
      })
      res.status(200).json("The video has been removed.")
    } catch (err) {
      next(err);
    }
  };






  export const savedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const SavedVideos = user.savedVideos;
    const list = await Promise.all(
      SavedVideos.map(async (videoId) => {
        return await Video.find({ _id: videoId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const addToHistory = async (req, res, next) => {
  const userId = req.params.userId;
  const videoId = req.params.videoId;
  try {
    await User.findByIdAndUpdate(userId,{
      $addToSet:{history:videoId},
    })
    res.status(200).json("The video has been saved in history.")
  } catch (err) {
    next(err);
  }
};

  export const historyVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const HistoryVideos = user.history;
    const list = await Promise.all(
      HistoryVideos.map(async (videoId) => {
        return await Video.find({ _id: videoId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};


