import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";

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
                        <PropertyCard key={item._id} item={item} />
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