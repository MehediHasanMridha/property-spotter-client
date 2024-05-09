import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";

const Home = () => {
    const homeData = useLoaderData();
    const [search, setSearch] = useState("");
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        setMainData(homeData);
    }, [homeData]);

    const filterData = (item) => {
        const searchMatch = item.propertyType.toLowerCase().includes(search.toLowerCase());
        const locationMatch = item.address.toLowerCase().includes(search.toLowerCase());
        return searchMatch || locationMatch;
    };

    return (
        <main>
            <Banner search={search} setSearch={setSearch} mainData={mainData} filterData={filterData}/>
            <Places />
            <AdvertisesProperty />
            <ReducedPrice mainData={mainData} filterData={filterData} />
            {/* <Steper /> */}
        </main>
    );
};
export default Home;
