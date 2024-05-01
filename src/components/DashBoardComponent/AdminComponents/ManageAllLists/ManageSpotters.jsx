import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageSpotters = () => {
    const [spotters, setSpotters] = useState([]);
    const [spotterData, setSpotterData] = useState(null);
    const [openEditModal, setEditModal] = useState(false);
    const [openListModal, setListModal] = useState(false);
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/all-spotters/")
            .then((res) => res.json())
            .then((data) => setSpotters(data));
    });
    const handleEditModal = (spotter) => {
        setEditModal(true);
        setSpotterData(spotter);
    };
    const handleListModal = (spotter) => {
        setListModal(true);
        const name = spotter.name.toLowerCase()
        fetch(`http://localhost:5000/all-list/${name}`)
            .then((res) => res.json())
            .then((data) => setTableData(data));
        console.log(tableData);
    };
    const closeListModal = () => {
        setListModal(false);
        setTableData([])
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.email.value;
        const res = await fetch(
            `http://localhost:5000/edit-spotter/${spotterData._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            }
        );
        setEditModal(false);
        setSpotterData(null);
        toast.success("Successfully updated");
    };

    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="py-3 px-6 text-left border-b">
                                Name
                            </th>
                            <th className="py-3 px-6 text-left border-b">
                                Email
                            </th>
                            <th className="py-3 px-6 text-left border-b">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {spotters.map((spotter, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition duration-300"
                            >
                                <td className="py-4 px-6 border-b">
                                    {spotter.name}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    {spotter.email}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    <div className="relative flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleEditModal(spotter)
                                            }
                                            className="bg-primary text-sm text-white  px-3 py-2"
                                        >
                                            Edit
                                        </button>
                                        <div
                                            onClick={() => setEditModal(false)}
                                            className={`fixed z-[100] flex items-center justify-center ${
                                                openEditModal
                                                    ? "opacity-1 visible"
                                                    : "invisible opacity-0"
                                            } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
                                        >
                                            <div
                                                onClick={(e_) =>
                                                    e_.stopPropagation()
                                                }
                                                className={`absolute top-10 w-full rounded-lg bg-white  drop-shadow-2xl sm:w-[500px] ${
                                                    openEditModal
                                                        ? "opacity-1 translate-y-0 duration-300"
                                                        : "-translate-y-20 opacity-0 duration-150"
                                                }`}
                                            >
                                                <form
                                                    onSubmit={handleUpdate}
                                                    className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 h-96 overflow-y-scroll"
                                                >
                                                    <svg
                                                        onClick={() =>
                                                            setEditModal(false)
                                                        }
                                                        className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g strokeWidth="0"></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                                        </g>
                                                    </svg>
                                                    <div className="space-y-5">
                                                        {/* Input fields for name, city, and country */}
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="Name"
                                                                defaultValue={
                                                                    spotterData?.name
                                                                }
                                                                className="border border-black py-3 px-5 w-full"
                                                            />
                                                            <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                                                Spotter Name
                                                            </h1>
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                placeholder="Email"
                                                                defaultValue={
                                                                    spotterData?.email
                                                                }
                                                                className="border border-black py-3 px-5 w-full"
                                                            />
                                                            <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                                                Spotter Email
                                                            </h1>
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="password"
                                                                placeholder="*********"
                                                                defaultValue={
                                                                    spotterData?.password
                                                                }
                                                                className="border border-black py-3 px-5 w-full"
                                                            />
                                                            <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                                                Password
                                                            </h1>
                                                        </div>
                                                        {/* Submit button */}
                                                        <button
                                                            type="submit"
                                                            className="border-2 bg-black text-white border-black py-3 px-5 w-full"
                                                        >
                                                            Submit Now
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleListModal(spotter)}
                                            className="bg-green-500 text-sm text-white  px-3 py-2"
                                        >
                                            View Lists
                                        </button>
                                        <div
                                            onClick={() => closeListModal()}
                                            className={`fixed z-[100] flex items-center justify-center ${
                                                openListModal
                                                    ? "opacity-1 visible"
                                                    : "invisible opacity-0"
                                            } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
                                        >
                                            <div
                                                onClick={(e_) =>
                                                    e_.stopPropagation()
                                                }
                                                className={`absolute top-10 w-full rounded-lg bg-white  drop-shadow-2xl sm:w-[750px] ${
                                                    openListModal
                                                        ? "opacity-1 translate-y-0 duration-300"
                                                        : "-translate-y-20 opacity-0 duration-150"
                                                }`}
                                            >
                                                <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
                                                    <thead>
                                                        <tr className="bg-primary text-white">
                                                            <th className="py-3 px-6 text-left border-b">
                                                            Owner Name
                                                            </th>
                                                            <th className="py-3 px-6 text-left border-b">
                                                            Bathroom
                                                            </th>
                                                            <th className="py-3 px-6 text-left border-b">
                                                            Bedroom
                                                            </th>
                                                            <th className="py-3 px-6 text-left border-b">
                                                            Sell Time
                                                            </th>
                                                            <th className="py-3 px-6 text-left border-b">
                                                            Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableData.map(item=>(<tr>
                                                            <td className="py-4 px-6 border-b">{item.houseOwnerName}</td>
                                                            <td className="py-4 px-6 border-b">{item.bathroom}</td>
                                                            <td className="py-4 px-6 border-b">{item.bedroom}</td>
                                                            <td className="py-4 px-6 border-b">{item.sellTime}</td>
                                                            <td className="py-4 px-6 border-b">{item.status}</td>
                                                        </tr>))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <button className="bg-amber-500 text-sm text-white  px-3 py-2">
                                            Payout
                                        </button>
                                        <button className="bg-primary text-sm text-white  px-3 py-2">
                                            Allocate a payout
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSpotters;
