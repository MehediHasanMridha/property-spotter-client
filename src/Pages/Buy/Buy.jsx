import axios from "axios";
import { useEffect, useState } from "react";
import { LiaToiletSolid } from "react-icons/lia";
import { LuBedDouble } from "react-icons/lu";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { Helmet } from "react-helmet-async";

const BuyPage = () => {
    const [area, setArea] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(12);
    useEffect(() => {
        fetchArea();
    }, []);

    const fetchArea = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/house/houseAvailableData"
            );
            setArea(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    // Logic for pagination
    const indexOfLastFlat = currentPage * HousePerPage;
    const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
    const currentAgency = area.slice(indexOfFirstFlat, indexOfLastFlat);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Helmet>
        <title>Buy</title>
      </Helmet>
            <Breadcrumb title={"Buy"} />
            <div className="px-6 py-5 flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
                    {currentAgency.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow rounded-xl"
                        >
                            <Link to={`/property-details/${item._id}`}>
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="rounded-lg h-56 mx-auto mt-2"
                                    />
                                    <div className="absolute flex flex-col justify-center items-center right-3.5 gap-2 bottom-2">
                                        <img
                                            className="w-12 h-12 rounded-full"
                                            src={item.agencyImage}
                                            alt=""
                                        />
                                        <h3 className="bg-blue-100/60 px-2 rounded-md py-0.5 text-primary">
                                            {item.agencyName}
                                        </h3>
                                    </div>
                                </div>
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
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* for pagination */}
            <div className=" flex flex-wrap justify-center mb-10 mt-10">
                <button
                    className="join-agencys btn btn-outline btn-primary mr-2"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <span className="text-white"> &larr; Previous page</span>
                </button>
                {Array.from(
                    { length: Math.ceil(area.length / HousePerPage) },
                    (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`join-agencys btn btn-outline btn-primary  text-white mr-2 ${
                                currentPage === i + 1
                                    ? "bg-primary border-2 border-black text-white"
                                    : ""
                            }`}
                        >
                            <span className="text-white">{i + 1}</span>
                        </button>
                    )
                )}
                <button
                    className="join-agencys btn btn-outline btn-primary  mr-2"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                        currentPage === Math.ceil(area.length / HousePerPage)
                    }
                >
                    <span className="text-white">Next&rarr;</span>
                </button>
            </div>
        </div>
    );
};

export default BuyPage;