import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Main from "../Layout/Main";
import BuyPage from "../Pages/Buy/Buy";
import CommercialPage from "../Pages/Commercial/Commercial";
import Home from "../Pages/Home/Home";
import ResidentialPage from "../Pages/Residential/Residential";
import SellPage from "../Pages/Sell/Sell";
import LoginSignUp from "../components/Authentication/LoginSignUp";
import OtpUI from "../components/Authentication/OtpUI/OtpUI";
import ManageAgency from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgency";
import ManageAgent from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgent";
import ManageListByAgency from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageListByAgency";
import ManageListBySpotter from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageListBySpotter";
import ManageSpotters from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageSpotters";
import ManageArea from "../components/DashBoardComponent/AdminComponents/ManageArea/ManageArea";
import ManageListing from "../components/DashBoardComponent/AgencyComponents/ManageListing";
import ManageListsByAgent from "../components/DashBoardComponent/AgencyComponents/ManageListsByAgent";
import ManageListsBySpotter from "../components/DashBoardComponent/AgencyComponents/ManageListsBySpotter";
import PendingSpottedLists from "../components/DashBoardComponent/AgencyComponents/PendingSpottedLists";
import ManageLIstings from "../components/DashBoardComponent/AgentCoomponents/ManageLIstings";
import PendingSpottedLIst from "../components/DashBoardComponent/AgentCoomponents/PendingSpottedLIst";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ForgotPassword/ResetPassword/ResetPassword";
import Profiles from "../components/Profiles/Profiles";
import SoopReg from "../components/SpooterRegistra/SoopReg";

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
        loader: ()=> fetch("http://localhost:5000/house/houseData"),
        element: <ResidentialPage />,
      },
      {
        path: "/commercial",
        loader: ()=> fetch("http://localhost:5000/house/houseData"),
        element: <CommercialPage />,
      },
      {
        path: "/loginSignup",
        element: <LoginSignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset_password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/spotter-reg",
        element: <SoopReg />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/otp",
        element: <OtpUI />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/manageAreas",
        element: <ManageArea />,
      },
      {
        path: "/dashboard/ManageAllListings/manageAgencies",
        element: <ManageAgency />,
      },
      {
        path: "/dashboard/ManageAllListings/manageAgents",
        element: <ManageAgent />,
      },
      {
        path: "/dashboard/ManageAllListings/manageSpotters",
        element: <ManageSpotters />,
      },
      {
        path: "/dashboard/ManageAllListings/manageListingByAgency",
        element: <ManageListByAgency/>,
      },
      {
        path: "/dashboard/ManageAllListings/manageListingBySpotter",
        element:<ManageListBySpotter/>
      },
      {
        path: "/dashboard/ManageAllListings/profile",
        element: <Profiles />,
      },

      //Agency Components--------------------------
      {
        path: "/dashboard/agency/manageListings",
        element: <ManageListing />,
      },
      {
        path: "/dashboard/agency/manageListingsByAgent",
        element: <ManageListsByAgent />,
      },
      {
        path: "/dashboard/agency/pendingSpottedListings",
        element: <PendingSpottedLists />,
      },
      {
        path: "/dashboard/agency/manageListingsBySpotter",
        element: <ManageListsBySpotter />,
      },
      {
        path: "/dashboard/agency/profile",
        element: <Profiles />,
      },

      //Agent Components-----------------------
      {
        path: "/dashboard/agent/profile",
        element: <Profiles />,
      },
      {
        path: "/dashboard/agent/pendingSpottedListings",
        element: <PendingSpottedLIst />,
      },
      {
        path: "/dashboard/agent/manageListing",
        element: <ManageLIstings />,
      },
    ],
  },
]);
