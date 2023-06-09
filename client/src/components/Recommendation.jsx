import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Card from "./Card";
import RecCard from "./RecCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/config";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const { currentVideo } = useSelector((state) => state.video);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/video/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);


  return (
    <Container>
      {videos.filter(video => video._id !== currentVideo._id).map((video) => (
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }} key={video._id}>
        <RecCard type="sm" key={video._id} video={video} />
    </Link>
      ))}
    </Container>
  );
};

export default Recommendation;