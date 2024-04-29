import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaToiletSolid } from "react-icons/lia";
import { LuBedDouble } from "react-icons/lu";
import Slider from "../PropertyCard/Slider";

const PropertyCard = () => {
    return (
        <div className="bg-white shadow-xl rounded-2xl">
            <Slider />
            <div className="px-3 py-2.5">
                <h3 className="flex items-center text-sm text-gray-500 uppercase font-semibold gap-2">
                    <HiOutlineLocationMarker size={18} /> Dhaka, Bangladesh
                </h3>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-black to-slate-800 bg-clip-text text-transparent py-3">
                    Merrick in Spring Way
                </h2>
                <ul className="flex justify-between text-gray-700">
                    <li className="space-x-2">
                        <LuBedDouble className="inline" />
                        <span>Bed: 04</span>
                    </li>
                    <li className="space-x-2">
                        <LiaToiletSolid className="inline" />
                        <span>Births: 01</span>
                    </li>
                    <li className="space-x-2">
                        <LuBedDouble className="inline" />
                        <span>Rooms: 04</span>
                    </li>
                </ul>
                <div className="flex justify-between items-center py-2">
                    <h3 className="text-primary/80 text-lg font-bold py-2.5">
                        $9554.00
                    </h3>
                    <button className="inline-block rounded bg-primary/10 px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-primary/90 transition duration-150 ease-in-out hover:bg-primary/20 focus:bg-primary/30 focus:outline-none focus:ring-0 active:bg-primary/20">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;