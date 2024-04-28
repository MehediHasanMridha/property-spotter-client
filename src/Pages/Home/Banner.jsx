import { PiHouseLight } from "react-icons/pi";
import BannerImage from "../../assets/images/banner.svg";

const Banner = () => {
    return (
        <div
            className="flex justify-center items-center bg-primary bg-no-repeat bg-bottom w-full h-[550px]"
            style={{ backgroundImage: `url(${BannerImage})` }}
        >
            <div className="text-center space-y-5 w-1/2 mx-auto">
                <h3 className="text-5xl font-bold text-white py-3">
                    Find Property for Sale
                </h3>
                <div className="relative">
                    <PiHouseLight className="absolute left-2 top-3.5 text-gray-600" size={28} />
                    <input
                        className="border focus:outline-none border-primary ring-4 rounded-md w-full px-10 py-4"
                        type="text"
                        placeholder="Search for your dream house"
                        name=""
                        id=""
                    />
                    <button className="absolute right-1 top-2 bg-primary text-white text-xl font-bold rounded-md px-5 py-2">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
