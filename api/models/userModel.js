import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.fromGoogle;
    },
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [String],
    default: [],
  },
  fromGoogle:{
    type: Boolean,
    default: false,
  },
  savedVideos:{
    type:[String],
    default:[],
  },
  history:{
    type:[String],
    default:[],
  },
},{timestamps: true});

export default mongoose.model("User", userSchema)
