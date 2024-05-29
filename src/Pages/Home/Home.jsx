import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";
import SplashScreen from "./SplashScreen";

const Home = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        const res = await fetch(
            "http://localhost:5000/house/houseAvailableData"
        );
        const data = await res.json();
        setMainData(data);
    };
    const filterData = (item) => {
        const searchMatch = item.propertyType
            .toLowerCase()
            .includes(search.toLowerCase());
        const locationMatch = item.address
            .toLowerCase()
            .includes(search.toLowerCase());
        return searchMatch || locationMatch;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {user ? <AdvertisesProperty /> : <SplashScreen />}

            <Banner
                search={search}
                setSearch={setSearch}
                mainData={mainData}
                filterData={filterData}
            />
            <Places />
            <ReducedPrice mainData={mainData} filterData={filterData} />
            {/* <Steper /> */}
        </main>
    );
};
export default Home;
