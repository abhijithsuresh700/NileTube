import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Card from "../components/Card";
import Recommendation from "../components/Recommendation";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { savedVideo, subscription } from "../redux/userSlice";
import axios from "axios";
import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance } from "../utils/config.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  padding: 5px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  position: relative;
`;

const DropDown = styled.div`
  position: absolute;
  display: flex;
  // align-items: center;
  // justify-content: center;
  flex-direction: column;
  margin-top: 60px;
  margin-left: 100px
  z-index: 9999;
`;

const DropDownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 38, 38);
  padding: 7.5px;
  border-radius: 10px;
  margin-left: -50px;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 480px;
  width: 100%;
  object-fit: cover;
  // position: relative;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [moreHorizOpen, setMoreHorizOpen] = useState(false);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const userId = currentUser?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axiosInstance.get(
          `/video/find/${path}`
        );
        const channelRes = await axiosInstance.get(
          `/user/find/${videoRes?.data.userId}`
        );
        setChannel(channelRes?.data);
        dispatch(fetchSuccess(videoRes?.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      await axiosInstance.put(
        `/user/like/${currentVideo?._id}/${userId}`
      );
    }
    dispatch(like(currentUser?._id));
  };

  const handleDislike = async () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      await axiosInstance.put(
        `/user/dislike/${currentVideo?._id}/${userId}`
      );
    }
    dispatch(dislike(currentUser?._id));
  };

  const handleSub = async () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      currentUser.subscribedUsers.includes(channel?._id)
        ? await axiosInstance.put(
            `/user/unsub/${channel?._id}/${currentUser?._id}`
          )
        : await axiosInstance.put(
            `/user/sub/${channel?._id}/${currentUser?._id}`
          );
    }
    dispatch(subscription(channel?._id));
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      currentUser.savedVideos?.includes(currentVideo?._id)
        ? await axiosInstance.put(
            `/user/unsaveVideo/${currentVideo?._id}/${userId}`
          )
        : await axiosInstance.put(
            `/user/saveVideo/${currentVideo?._id}/${userId}`
          );
    }
    dispatch(savedVideo(currentVideo?._id));
  };

  const handleDelete = async () => {
    const del = await axiosInstance.delete(
      `/video/${currentVideo._id}`
    );
    if (del.status === 200) {
      toast.success(del.data, { position: toast.POSITION.TOP_RIGHT });
    }
    navigate("/");
  };

  useEffect(()=>{
    if(userId !== undefined){
      const effect =async()=>{
        await axiosInstance.put(
          `/user/addHistory/${currentVideo?._id}/${userId}`
          ); 
        }
        effect();
      }

  },[currentVideo])

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button onClick={handleSave}>
              {currentUser?.savedVideos?.includes(currentVideo?._id) ? (
                <>
                  <TaskAltOutlinedIcon /> saved
                </>
              ) : (
                <>
                  <AddTaskOutlinedIcon /> save
                </>
              )}
            </Button>
            <Button>
              <MoreHorizIcon onClick={() => setMoreHorizOpen(!moreHorizOpen)} />
              <DropDown>
                {moreHorizOpen ? (
                  <>
                    {currentUser._id === channel._id ? (
                      <DropDownButton onClick={handleDelete}>
                        <DeleteIcon /> Delete
                        <ToastContainer />
                      </DropDownButton>
                    ) : (
                      <DropDownButton>
                        <FlagOutlinedIcon /> Report
                      </DropDownButton>
                    )}
                  </>
                ) : (
                  ""
                )}
              </DropDown>
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
