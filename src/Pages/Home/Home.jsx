import { useEffect, useState } from "react";
import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";

const Home = () => {
    const [search, setSearch] = useState("");
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/house/houseData");
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

    return (
        <main>
            <Banner
                search={search}
                setSearch={setSearch}
                mainData={mainData}
                filterData={filterData}
            />
            <Places />
            <AdvertisesProperty />
            <ReducedPrice mainData={mainData} filterData={filterData} />
            {/* <Steper /> */}
        </main>
    );
};
export default Home;
