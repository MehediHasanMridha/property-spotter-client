import { LiaToiletSolid } from "react-icons/lia";
import { LuBedDouble } from "react-icons/lu";

const PropertyCard = ({item}) => {
    
    return (
        <div className="bg-white shadow rounded-xl">
            <img src={item.image} alt="" />
            <div className="px-3 py-2.5">
                <h3 className="flex items-center text-sm text-gray-500 uppercase font-semibold gap-2">
                    <span className="text-primary text-2xl">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.3"
                                d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </span>{" "}
                    {item.address}
                </h3>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-black to-slate-800 bg-clip-text text-transparent py-3 uppercase">
                {item.propertyType}
                </h2>
                <ul className="flex justify-between text-gray-700">
                    <li className="space-x-2">
                        <LuBedDouble className="inline" />
                        <span>Bed:{item.bedroom}</span>
                    </li>
                    <li className="space-x-2">
                        <LiaToiletSolid className="inline" />
                        <span>Births:{item.bathroom}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PropertyCard;
