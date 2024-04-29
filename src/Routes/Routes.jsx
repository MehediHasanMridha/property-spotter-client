import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import BuyPage from "../Pages/Buy/Buy";
import CommercialPage from "../Pages/Commercial/Commercial";
import Home from "../Pages/Home/Home";
import ResidentialPage from "../Pages/Residential/Residential";
import SellPage from "../Pages/Sell/Sell";

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
        ],
    },
]);
