import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import BuyPage from "../Pages/Buy/Buy";
import CommercialPage from "../Pages/Commercial/Commercial";
import Home from "../Pages/Home/Home";
import ResidentialPage from "../Pages/Residential/Residential";
import SellPage from "../Pages/Sell/Sell";
import LoginSignUp from "../components/Authentication/LoginSignUp";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ForgotPassword/ResetPassword/ResetPassword";
import Dashboard from "../Layout/Dashboard/Dashboard";

export const router = createBrowserRouter([
   
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/buy",
                element: <BuyPage />,
            },
            {
                path: "/sell",
                element: <SellPage />,
            },
            {
                path: "/residential",
                element: <ResidentialPage />,
            },
            {
                path: "/commercial",
                element: <CommercialPage />,
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
  
{
    path:"dashboard",
    element:<Dashboard/>,
    children:[
        {
          path:"/dashboard"

        }
    ]
}
]);

