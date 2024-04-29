import React from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { AuthContext } from "../../../Provider/AuthProvider";

const Login = () => {
  const { signinWithGoogle, facebookSignIn, login, user, setUser } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    try {
      await login(email, password);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleGoogleLogin = () => {
    signinWithGoogle()
      .then((result) => {
        const person = result?.user;
        console.log("🚀 ~ .then ~ person:", person);

        if (person) {
          const userData = {
            name: person?.displayName,
            email: person?.email,
            role: "",
            password: "",
            photoURL: person?.photoURL,
          };

          axios
            .post("http://localhost:5000/signup/google", userData, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log("🚀 ~ .then ~ response:", response.data);
              if (!response) {
                message.error("Failed to Signup");
              }
              const { token, user: userData } = response.data;
              message.success("SignUp successful");
              if (userData) {
                console.log("🚀 ~ handleGoogleLogin ~ userData:", userData);
                setUser(userData);
                localStorage.setItem("access-token", token);
                if (userData?.role === "jobseeker") {
                  navigate("/jobseeker/dashboard");
                } else if (userData?.role === "employer") {
                  navigate("/employer/dashboard");
                } else if (userData?.role === "admin") {
                  navigate("/admin/dashboard");
                }
              }
            })
            .catch((error) => {
              console.error("Error posting user data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };

  if (user) {
    console.log("role", user?.role);
    if (user?.role == "admin") navigate("/admin/dashboard");
  }
  return <div></div>;
};

export default Login;
