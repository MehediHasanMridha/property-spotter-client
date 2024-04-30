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
import ManageArea from "../components/DashBoardComponent/AdminComponents/ManageArea/ManageArea";
import SoopReg from "../components/SpooterRegistra/SoopReg";
import ManageAgency from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgency";
import ManageAgent from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgent";
import ManageSpotters from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageSpotters";
import Profile from "../components/DashBoardComponent/AdminComponents/ManageAllLists/Profile";
import AgentProfile from "../components/DashBoardComponent/AgentCoomponents/AgentProfile";
import PendingSpottedLIst from "../components/DashBoardComponent/AgentCoomponents/PendingSpottedLIst";
import ManageLIstings from "../components/DashBoardComponent/AgentCoomponents/ManageLIstings";
import ManageListing from "../components/DashBoardComponent/AgencyComponents/ManageListing";
import ManageListsByAgent from "../components/DashBoardComponent/AgencyComponents/ManageListsByAgent";
import AgencyProfile from "../components/DashBoardComponent/AgencyComponents/AgencyProfile";
import PendingSpottedLists from "../components/DashBoardComponent/AgencyComponents/PendingSpottedLists";
import ManageListsBySpotter from "../components/DashBoardComponent/AgencyComponents/ManageListsBySpotter";
import Profiles from "../components/Profiles/Profiles";

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
        path: "/dashboard/ManageAllListings/profile",
        element: <Profile />,
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
        element: <AgencyProfile />,
      },
      //Agent Components-----------------------
      {
        path: "/dashboard/agent/profile",
        element: <AgentProfile />,
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
