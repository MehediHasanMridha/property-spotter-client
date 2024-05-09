import { LiaToiletSolid } from "react-icons/lia";
import { LuBedDouble } from "react-icons/lu";
import { Link } from "react-router-dom";

const PropertyCard = ({item}) => {

    console.log("itemmmmmm",item.image);


    return (
        <div className="bg-white shadow rounded-xl">
            <img src={item.image} alt="" className="rounded-lg h-56" />
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
                <div className="flex justify-between items-center pt-6 pb-3">
                    <h3 className="text-primary/80 text-lg font-bold">
                        $9554.00
                    </h3>
                    <Link to={"/"} className="text-primary">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z"
                                fill="currentColor"
                            ></path>
                            <path
                                opacity="0.3"
                                d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
