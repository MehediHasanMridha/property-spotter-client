import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageListsByAgent = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [AgentPerPage] = useState(6);
  const [listings, setListings] = useState([]);


  const fetchAgentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/allusers/filterby/agent/${user?.name}`);
      console.log(response.data);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, [user]);

  const getBadgeClass = (role) => {
    switch (role) {
      case "blue":
        return "badge-primary";
      case "red":
        return "badge-error";
      case "purple":
        return "badge-info";
      case "orange":
        return "badge-warning";
      default:
        return "";
    }
  };

  // Logic for pagination
  const indexOfLastFlat = currentPage * AgentPerPage;
  const indexOfFirstFlat = indexOfLastFlat - AgentPerPage;
  const currentJobs = listings.slice(indexOfFirstFlat, indexOfLastFlat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
            Total Agent:
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
                <th>Agent</th>
                <th>Name</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentJobs.map((agent, index) => (
                <tr key={agent?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={agent?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{agent?.name}</td>
                  <td>{agent?.email}</td>
                  <td className="text-lg font-bold">
                    <div
                      className={`badge ${getBadgeClass(
                        agent?.agency
                      )} badge-md text-primary`}
                    >
                      {agent?.agencyName}
                    </div>
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
            <span className="text-white"> &larr; Previous page</span>
          </button>
          {Array.from(
            { length: Math.ceil(listings.length / AgentPerPage) },
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
            disabled={currentPage === Math.ceil(listings.length / AgentPerPage)}
          >
            <span className="text-white">Next&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageListsByAgent;
