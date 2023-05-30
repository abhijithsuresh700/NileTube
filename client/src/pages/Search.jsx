import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { axiosInstance } from "../utils/config";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7.5px;
  color: white;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(
        `/video/search${query}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);


  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
