import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/config.js";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  const [commentresponse, setCommentResponse] = useState("");

  const id = currentUser?._id;

  const handleComment = async (e) => {
    e.preventDefault;
    if (!currentUser) {
      navigate("/signin");
    } else {
      try {
        const response = await axiosInstance.post(`/comment`, {
          desc,
          id,
          videoId,
        });
        setDesc("");
        setCommentResponse(response.data);
      } catch (error) {
        console.log(error, "error of comment");
      }
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(
          `/comment/${videoId}`
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, commentresponse, desc]);

  return (
    <Container>
      <NewComment>
        <Avatar
          src={
            currentUser?.img ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9dAVtJaI0hrAMJWtDPJK2xduEijl0uORvEQ3y5npsQ&s"
          }
        />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <Button onClick={handleComment}>Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
