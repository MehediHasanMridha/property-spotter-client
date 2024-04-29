import SoopReg from "../../components/SpooterRegistra/SoopReg";
import Steper from "../../components/Steper/Steper";
import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";

const Home = () => {
    return (
        <main>
            <Banner />
            <Places />
            <AdvertisesProperty />
            <ReducedPrice />
            {/* <Steper /> */}
        </main>
    );
};
export default Home;
