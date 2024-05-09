import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider/AuthProvider";
import { router } from "./Routes/Routes";
import Loading from "./components/Loader/Loading";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={Loading}/>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
