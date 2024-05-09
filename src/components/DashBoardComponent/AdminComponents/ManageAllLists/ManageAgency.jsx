import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Provider/AuthProvider";

const ManageAgency = () => {
  const [showName, setShowName] = useState("");
  const [showImagePreview, setShowImagePreview] = useState("");
  const fileInputRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [agencyData, setAgencyData] = useState([]);
  const [updateAgency, setUpdateAgency] = useState(null);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [showAgent, setShowAgent] = useState("");
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [HousePerPage] = useState(6);

  const handleManageArea = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.ownername.value);
      formData.append("email", e.target.email.value);
      formData.append("agencyName", e.target.name.value);
      formData.append("password", e.target.password.value);
      formData.append("images", showName);

      const response = await axios.post(
        "http://localhost:5000/agency/add-agency",
        formData
      );
      if (response.status === 201) {
        toast.success("Added successfully");
        fetchAgency();
        setOpenModal(false)
      } else if (
        response.status === 400 &&
        response.data.error === "Email already exists"
      ) {
        toast.error("Email already exists");
      } else {
        toast.error("Email already exists");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email already exists");
    }
  };
  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  const fetchAgency = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allusers");
      setAgencyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const agencyDataFiltered = agencyData.filter(
    (agencys) => agencys.role === "agency"
  );

  const handleViewAgent = (name) => {
    const agentData = agencyData.find(
      (agent) => agent.agencyName === name && agent.role === "agent"
    );
    document.getElementById("my_modal_5").showModal();
    console.log("agentData", agentData);
    setShowAgent(agentData);
  };

  // console.log("agencyData",agencyData);
  const handleAgencyDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${email}`);
      toast.success("Agency Deleted");
      fetchAgency();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  //update Agent
  const editAgencyData = (id, agencys) => {
    setUpdateAgency(agencys);
    setUpdateOpenModal(true);
  };

  const updateAgencyData = async (event) => {
    event.preventDefault();

    const { ownername, name, email, password } = event.target.elements;
    const data = new FormData();
    data.append("name", ownername.value || updateAgency?.name);
    data.append("email", email.value || updateAgency?.email);
    data.append("agencyName", name.value || updateAgency?.agencyName);
    data.append("password", password.value);
    data.append("images", showName || "");
    data.append("oldPass", updateAgency?.password);
    data.append("isUpdate", password ? "False" : "True");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const id = updateAgency?._id;
    const url = `http://localhost:5000/admin/Update/${id}`;

    try {
      const response = await axios.put(url, data, config);
      console.log("🚀 ~ onFinish ~ response:", response);
      if (response.data.modifiedCount > 0) {
        toast.success("Data updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
      
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update. Please try again later.");
    }
  };

  // Logic for pagination
  const indexOfLastFlat = currentPage * HousePerPage;
  const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
  const currentAgency = agencyDataFiltered.slice(
    indexOfFirstFlat,
    indexOfLastFlat
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mx-auto flex items-center justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-md bg-green-700 py-3 px-10 text-white"
        >
          + Add Manage Agency
        </button>
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
              openModal
                ? "opacity-1 translate-y-0 duration-300"
                : "-translate-y-20 opacity-0 duration-150"
            }`}
          >
            <form
              onSubmit={handleManageArea}
              className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 overflow-y-scroll h-96 lg:h-[500px]"
            >
              <svg
                onClick={() => setOpenModal(false)}
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
                    name="ownername"
                    placeholder="Owner Name"
                    className="border border-black py-3 px-5 w-full"
                  />
                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                    Owner Name
                  </h1>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="border border-black py-3 px-5 w-full"
                  />
                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                    Owner Email
                  </h1>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border border-black py-3 px-5 w-full"
                  />
                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                    Agency Name
                  </h1>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="password"
                    placeholder="*********"
                    className="border border-black py-3 px-5 w-full"
                  />
                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                    Password
                  </h1>
                </div>
                {/* Image preview section */}
                <div className="my-10">
                  {showName && (
                    <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                      <img
                        className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                        src={showImagePreview}
                        alt="Uploaded"
                      />
                      {/* Display the name and size of the uploaded image */}
                      <div className="flex-1 space-y-1.5 overflow-hidden">
                        <h5 className="text-xl font-medium tracking-tight truncate">
                          {showName.name}
                        </h5>
                        <p className="text-gray-500">
                          {(showName.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {/* Button to clear the file */}
                      <div onClick={handleClearFile}>
                        <svg
                          width={30}
                          viewBox="0 -0.5 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG content */}
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Input field for file upload */}
                  <label
                    className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
                    htmlFor="fileInput"
                  >
                    <svg
                      width={50}
                      viewBox="0 0 42 32"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG content */}
                    </svg>
                    <div className="space-y-1.5 text-center">
                      <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
                        Upload your file
                      </h5>
                      <p className="text-sm text-gray-500">
                        File should be in PNG, JPEG, or JPG format
                      </p>
                    </div>
                  </label>
                  <input
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const imageFile = e.target.files[0];
                        setShowName(imageFile);
                        setShowImagePreview(URL.createObjectURL(imageFile));
                      }
                    }}
                    className="hidden"
                    id="fileInput"
                    type="file"
                  />
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
      </div>
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
              Total Agency:{" "}
              <span className="text-3xl text-primary font-bold">
                {agencyDataFiltered.length}
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
                  <th>Image</th>
                  <th>Owner Name</th>
                  <th>Owner Email</th>
                  <th>Agency Name</th>
                  <th>View Agent</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentAgency.map((agencys, index) => (
                  <tr key={agencys?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={agencys?.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{agencys?.name}</td>
                    <td>{agencys?.email}</td>
                    <td>{agencys?.agencyName}</td>
                    <td>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-info"
                          onClick={() => handleViewAgent(agencys.agencyName)}
                        >
                          View Agent
                        </button>
                      </div>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-3xl mb-3">
                            Agent{" "}
                            <span className="text-primary font-bold">
                              Details!
                            </span>
                          </h3>
                          <div className="text-center text-xl">
                            <div className="avatar">
                              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={showAgent?.photoURL} />
                              </div>
                            </div>
                            <h1>
                              <span className="font-semibold">Agent Name:</span>{" "}
                              <span className="text-primary font-bold text-2xl">
                                {showAgent?.name}
                              </span>
                            </h1>
                            <h1>
                              <span className="font-semibold">
                                Agent Email:
                              </span>{" "}
                              <span className="text-primary font-bold text-2xl">
                                {showAgent?.email}
                              </span>
                            </h1>
                            <h1>
                              <span className="font-semibold">
                                Agent location:
                              </span>{" "}
                              <span className="text-primary font-bold text-2xl">
                                {showAgent?.location
                                  ? showAgent.location
                                  : "N/A"}
                              </span>
                            </h1>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn btn-error">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                    <td>
                      <button className="bg-green-500 rounded-md text-white px-2 py-1.5">
                        <div className="mx-auto flex items-center justify-end">
                          <button
                            onClick={() => editAgencyData(agencys._id, agencys)}
                            className="rounded-md bg-green-500 py-3 px-5 text-white"
                          >
                            Edit Info
                          </button>
                          <div
                            onClick={() => setUpdateOpenModal(false)}
                            className={`fixed z-[100] flex items-center justify-center ${
                              updateOpenModal
                                ? "opacity-1 visible"
                                : "invisible opacity-0"
                            } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
                          >
                            <div
                              onClick={(e_) => e_.stopPropagation()}
                              className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
                                updateOpenModal
                                  ? "opacity-1 translate-y-0 duration-300"
                                  : "-translate-y-20 opacity-0 duration-150"
                              }`}
                            >
                              <form
                                onSubmit={updateAgencyData}
                                className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 overflow-y-scroll h-96 lg:h-[500px]"
                              >
                                <svg
                                  onClick={() => setUpdateOpenModal(false)}
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
                                      name="ownername"
                                      defaultValue={updateAgency?.name}
                                      // placeholder="Owner name"
                                      className="border border-black py-3 px-5 text-black w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-black text-sm">
                                      Owner Name
                                    </h1>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="email"
                                      defaultValue={updateAgency?.email}
                                      placeholder="Email"
                                      className="border border-black py-3 text-black px-5 w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-black text-sm">
                                      Owner Email
                                    </h1>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="name"
                                      defaultValue={updateAgency?.agencyName}
                                      // placeholder="Agency Name"
                                      className="border border-black py-3 px-5 text-black w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-black text-sm">
                                      Agency Name
                                    </h1>
                                  </div>

                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="password"
                                      placeholder="*********"
                                      className="border border-black py-3 px-5 text-black w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 text-black bg-white text-sm">
                                      Password
                                    </h1>
                                  </div>
                                  {/* Image preview section */}
                                  <div className="my-10">
                                    {showName && (
                                      <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                                        <img
                                          className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                                          src={showImagePreview}
                                          alt="Uploaded"
                                        />
                                        {/* Display the name and size of the uploaded image */}
                                        <div className="flex-1 space-y-1.5 overflow-hidden">
                                          <h5 className="text-xl font-medium tracking-tight truncate">
                                            {showName.name}
                                          </h5>
                                          <p className="text-gray-500">
                                            {(showName.size / 1024).toFixed(1)}{" "}
                                            KB
                                          </p>
                                        </div>
                                        {/* Button to clear the file */}
                                        <div onClick={handleClearFile}>
                                          <svg
                                            width={30}
                                            viewBox="0 -0.5 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            {/* SVG content */}
                                          </svg>
                                        </div>
                                      </div>
                                    )}
                                    {/* Input field for file upload */}
                                    <label
                                      className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
                                      htmlFor="fileInput"
                                    >
                                      <svg
                                        width={50}
                                        viewBox="0 0 42 32"
                                        fill="#000000"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {/* SVG content */}
                                      </svg>
                                      <div className="space-y-1.5 text-center">
                                        <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
                                          Upload your file
                                        </h5>
                                        <p className="text-sm text-gray-500">
                                          File should be in PNG, JPEG, or JPG
                                          format
                                        </p>
                                      </div>
                                    </label>
                                    <input
                                      ref={fileInputRef}
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          const imageFile = e.target.files[0];
                                          setShowName(imageFile);
                                          setShowImagePreview(
                                            URL.createObjectURL(imageFile)
                                          );
                                        }
                                      }}
                                      className="hidden"
                                      id="fileInput"
                                      type="file"
                                    />
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
                        </div>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAgencyDelete(agencys?.email)}
                        className="btn btn-error"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* for pagination */}
          <div className=" flex flex-wrap justify-center mb-10 mt-5">
            <button
              className="join-agencys btn btn-outline btn-primary mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="text-white"> &larr; Previous page</span>
            </button>
            {Array.from(
              { length: Math.ceil(agencyDataFiltered.length / HousePerPage) },
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
                currentPage ===
                Math.ceil(agencyDataFiltered.length / HousePerPage)
              }
            >
              <span className="text-white">Next&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAgency;
