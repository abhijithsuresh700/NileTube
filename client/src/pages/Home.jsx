import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/config";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
   const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchVideos = async () => {
        const res = await axiosInstance.get(`/video/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);




  return (
    <Container>
      {videos.map((video)=>{
        return (
          <Card key={video._id} video={video} />
        )
      })}
    </Container>
  );
};

export default Home;
