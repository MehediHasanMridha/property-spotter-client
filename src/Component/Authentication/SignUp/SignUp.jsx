import React from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { Button, Form, Input, message, Upload } from "antd";
import { AuthContext } from "../../../Provider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const { signinWithGoogle, user } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  if (user) {
    console.log("role", user?.role);
    if (user?.role == "jobseeker") navigate("/jobseeker/dashboard");
    if (user?.role == "employer") navigate("/employer/dashboard");
  }

  const onFinish = async (values) => {
    try {
      const { name, email, password, confirmPassword } = values;

      // Validate password
      if (!/(?=.*[A-Z]).*[a-z]/.test(password)) {
        setError("Please add at least one uppercase and one lowercase letter");
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Password and Confirm Password do not match");
        return;
      }

      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("role", "jobseeker");
      data.append("password", confirmPassword);
      data.append("images", fileList[0].originFileObj);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = "http://localhost:5000/signup";
      try {
        await axios.post(url, data, config);
        message.success("Signup successful");
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Signup failed:", error);
        message.error("Failed to signup. Please try again later.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      message.error("Failed to signup. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    setFileList(e.fileList);
    // console.log(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    fileList,
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
  return <div></div>;
};

export default SignUp;
