import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Provider/AuthProvider";

const ManageListByAdmin = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(6);
    const [listings, setListings] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedAgencies, setSelectedAgencies] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState([]);
    const [allAgency, setAllAgency] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState(false);
    const [allAgent, setAllAgent] = useState([]);
    const fetchAgency = async () => {
        try {
            const response = await axios.get("http://localhost:5000/allusers");
            setAllAgency(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchAgent = async (name) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/all-agents/${name}`
            );
            return setAllAgent(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAgency();
        fetchListingData();
    }, []);

    const fetchListingData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/house/houseDataByAdmin"
            );
            setListings(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDetailsClick = (house) => {
        document.getElementById("my_modal_4").showModal();
        setSelectedHouse(house);
    };

    const getBadgeClass = (role) => {
        switch (role) {
            case "approved":
                return "badge-accent";
            case "pending":
                return "badge-warning";
            case "offer pending":
                return "badge-warning";
            case "pending mandate":
                return "badge-warning";
            case "pending contact with client":
                return "badge-warning";
            case "hold":
                return "badge-warning";
            case "available":
                return "badge-success";
            case "sold":
                return "badge-success";
            default:
                return "";
        }
    };

    // Logic for pagination
    const indexOfLastFlat = currentPage * HousePerPage;
    const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
    const currentJobs = listings.slice(indexOfFirstFlat, indexOfLastFlat);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const houseUpdate = async (e, house) => {
        try {
            const value = e.target.innerText.toLowerCase();
            const res = await fetch(
                `http://localhost:5000/house/update/${house._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: value,
                        agencyName: user.name,
                        agencyEmail: user.email,
                        agencyImage: user.photoURL,
                    }),
                }
            );
            toast.success(`Successfully ${value}`);
            fetchListingData();
            document.getElementById(`my_modal_${house._id}`).close();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="p-6">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-7">
                    <div className="flex justify-center shadow-xl border-2 border-primary p-4 rounded-md mb-7">
                        <div className="text-center">
                            <h4 className="text-xl font-medium ">
                                Hello,
                                <span className="text-3xl font-bold text-primary uppercase">
                                    {user?.name}
                                </span>
                            </h4>
                            <p>{"Here's what's going on"}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center shadow-xl border-2 border-primary p-4 rounded-md mb-7">
                        <h4 className="text-2xl font-medium">
                            Total Spotter:{" "}
                            <span className="text-3xl text-primary font-bold">
                                {listings.length}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="shadow-2xl border-2 border-primary p-5 rounded-md">
                    <div className="flex justify-between"></div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr className="font-semibold text-base text-center">
                                    <th>No.</th>
                                    <th>Spooter Name</th>
                                    <th>Spooter Email</th>
                                    <th>Owner Name</th>
                                    <th>Owner Email</th>
                                    <th>House Phone</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {currentJobs.map((house, index) => (
                                    <tr key={house?.jobData?._id}>
                                        <td>{index + 1}</td>
                                        <td>{house?.spooterName}</td>
                                        <td>{house?.spooterEmail}</td>
                                        <td>{house?.houseOwnerName}</td>
                                        <td>{house?.houseOwnerEmail}</td>
                                        <td>{house?.houseOwnerPhone}</td>
                                        <td>
                                            <div
                                                className={`px-2 py-1 capitalize text-lg rounded-lg  ${getBadgeClass(
                                                    house?.status
                                                )} text-white`}
                                            >
                                                {house?.status}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `my_modal_${house._id}`
                                                            )
                                                            .showModal()
                                                    }
                                                >
                                                    Action
                                                </button>
                                                <dialog
                                                    id={`my_modal_${house._id}`}
                                                    className="modal"
                                                >
                                                    <div className="modal-box w-fit">
                                                        <ul className="p-2 menu z-[1] rounded-box">
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    Approved
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    Available
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    Sold
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    Hold
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    PENDING
                                                                    MANDATE
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    Pending
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="hover:bg-primary hover:text-white"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        houseUpdate(
                                                                            e,
                                                                            house
                                                                        )
                                                                    }
                                                                >
                                                                    PENDING
                                                                    CONTACT WITH
                                                                    CLIENT
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn btn-primary bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600">
                                                                    Close
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        handleDetailsClick(
                                                            house
                                                        )
                                                    }
                                                >
                                                    Details
                                                </button>
                                            </div>
                                            <dialog
                                                id="my_modal_5"
                                                className="modal modal-bottom sm:modal-middle"
                                            >
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-3xl mb-3">
                                                        House{" "}
                                                        <span className="text-primary font-bold">
                                                            Details!
                                                        </span>
                                                    </h3>
                                                    <div className="text-center text-xl">
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Bedroom:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.bedroom
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Bathroom:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.bathroom
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Sell Time:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.sellTime
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Agency:
                                                            </span>
                                                            {selectedHouse?.agency.map(
                                                                (
                                                                    agencyItem,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-primary font-bold text-2xl ml-2"
                                                                    >
                                                                        {
                                                                            agencyItem
                                                                        }
                                                                        ,
                                                                    </span>
                                                                )
                                                            )}
                                                        </h1>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn btn-error">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* for pagination */}
                    <div className=" flex flex-wrap justify-center mb-10 mt-5">
                        <button
                            className="join-item btn btn-outline btn-primary mr-2"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span className="text-white">
                                {" "}
                                &larr; Previous page
                            </span>
                        </button>
                        {Array.from(
                            {
                                length: Math.ceil(
                                    listings.length / HousePerPage
                                ),
                            },
                            (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`join-item btn btn-outline btn-primary  text-white mr-2 ${
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
                            className="join-item btn btn-outline btn-primary  mr-2"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                                currentPage ===
                                Math.ceil(listings.length / HousePerPage)
                            }
                        >
                            <span className="text-white">Next&rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ManageListByAdmin;
