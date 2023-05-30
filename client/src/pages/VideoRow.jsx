import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/config.js";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7.5px;
  color: white;
`;

function VideoRow({type,model}) {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

      const { currentUser } = useSelector((state) => state.user);
      const userId = currentUser?._id;
  
    useEffect(() => {
      const fetchVideos = async () => {
        if(!currentUser){
          navigate("/signin")
        }else{
        const res = await axiosInstance.get(
          `/${model}/${type}/${userId}`
        );
        setVideos(res.data);
      }};
      fetchVideos();
    }, [userId,type,model]);
  return (
    <Container>
    {videos.map((video) => (
      <Card key={video._id} video={video} />
    ))}
  </Container>

  )
}

export default VideoRow