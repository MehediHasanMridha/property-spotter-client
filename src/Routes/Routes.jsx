import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginSignUp from "../Components/Authentication/LoginSignUp";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import ResetPassword from "../Components/ForgotPassword/ResetPassword/ResetPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/loginSignup',
                element: <LoginSignUp/>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
              },
              {
                path: "/reset_password/:id/:token",
                element: <ResetPassword />
              },
        ]
    },
]);