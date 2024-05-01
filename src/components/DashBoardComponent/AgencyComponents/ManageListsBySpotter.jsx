import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageListsBySpotter = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [SpooterPerPage] = useState(6);
  const [spooterList, setSpooterList] = useState([]);

  const fetchAgentData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allusers/filterby/spooter");
      setSpooterList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, []);

  // Logic for pagination
  const indexOfLastFlat = currentPage * SpooterPerPage;
  const indexOfFirstFlat = indexOfLastFlat - SpooterPerPage;
  const currentSpooterList = spooterList.slice(indexOfFirstFlat, indexOfLastFlat);

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
              {spooterList.length}
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
                <th>Spooter</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentSpooterList.map((spooter, index) => (
                <tr key={spooter?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={spooter?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{spooter?.name}</td>
                  <td>{spooter?.email}</td>
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
            { length: Math.ceil(spooterList.length / SpooterPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`join-item btn btn-outline btn-primary  text-white mr-2 ${
                  currentPage === i + 1 ? "bg-primary border-2 border-black text-white" : ""
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
              currentPage === Math.ceil(spooterList.length / SpooterPerPage)
            }
          >
            <span className="text-white">Next&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageListsBySpotter;