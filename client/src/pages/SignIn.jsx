import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../utils/config.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [shouldResetFields, setShouldResetFields] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post(
        "/auth/signin",
        {
          name,
          password,
        },
        { credentials: "include" }
      );
      dispatch(loginSuccess(res.data));
      setShouldResetFields(true);
      navigate("/");
    } catch (err) {
      if (err?.response?.data?.status === 400) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (err.response.data.status === 404) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("SignUp success. Please login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setShouldResetFields(true);
      } else {
        toast.error("SignUp failed", { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      dispatch(loginStart());
      const result = await signInWithPopup(auth, provider);
      const res = await axiosInstance.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  useEffect(() => {
    if (shouldResetFields) {
      setName("");
      setEmail("");
      setPassword("");
      setShouldResetFields(false);
    }
  }, [shouldResetFields]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to NileTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign up</Button>
        <ToastContainer />
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
