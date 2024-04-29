import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";

const Home = () => {
    return (
        <main>
            <Banner />
            <Places/>
            <AdvertisesProperty/>
            <ReducedPrice/>
        </main>
    );
};

export default Home;
