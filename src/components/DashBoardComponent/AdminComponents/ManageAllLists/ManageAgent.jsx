import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Select } from "antd";
import { AuthContext } from "../../../../Provider/AuthProvider";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
];
const ManageAgent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [agentData, setAgentData] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [allAgency, setAllAgency] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [HousePerPage] = useState(6);
  const [showName, setShowName] = useState("");
  const fileInputRef = useRef();
  const [showImagePreview, setShowImagePreview] = useState("");
  //getAllAgent
  const handleOrganizationChange = (value) => {
    setSelectedOrganization(value);
  };

  const handleManageAgent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
      formData.append("agencyName", selectedOrganization);

      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const agencyName = selectedOrganization;

      const data = {
        name,
        email,
        password,
        agencyName,
      };
      const response = await axios.post("http://localhost:5000/agent", data);

      if (response.status === 201) {
        setOpenModal(false);
        toast.success("Added successfully");
        fetchAgent();
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

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allusers");
      setAgentData(response.data);
      setAllAgency(response.data.filter((agents) => agents.role === "agency"));
    } catch (error) {
      console.error(error);
    }
  };


  console.log("allAgency",allAgency);

  const agentDataFiltered = agentData.filter(
    (agents) => agents.role === "agent"
  );

  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  // console.log("agentDataFiltered", agentDataFiltered);
  //update Agent
  const editAgentData = (id, agents) => {
    setUpdateData(agents);
    setUpdateOpenModal(true);
  };

  const updateAgentData = async (event) => {
    event.preventDefault();
    const { name, email, password, agency } = event.target.elements;
    const data = new FormData();
    data.append("name", name.value || updateData?.name);
    data.append("email", email.value || updateData?.email);
    data.append("agencyName", agency.value || updateData?.agencyName);
    data.append("password", password.value)
    data.append("images", showName || "");
    data.append("oldPass", updateData?.password);
    data.append("isUpdate", password ? "False" : "True");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const id = updateData?._id;
    const url = `http://localhost:5000/admin/Update/${id}`;

    try {
      const response = await axios.put(url, data, config);
      console.log("🚀 ~ onFinish ~ response:", response);
      if (response.data.modifiedCount > 0) {
        toast.success("Data updated successfully");
        fetchAgent();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update. Please try again later.");
    }
  };

  //deleteAgent
  const handleAgentDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${email}`);
      toast.success("Agency Deleted");
      fetchAgent();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  // Logic for pagination
  const indexOfLastFlat = currentPage * HousePerPage;
  const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
  const currentAgency = agentDataFiltered.slice(
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
          + Add Manage Agent
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
            <form enctype="multipart/form-data"
              onSubmit={handleManageAgent}
              className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 h-96 overflow-y-scroll"
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
                    name="name"
                    placeholder="Name"
                    className="border border-black py-3 px-5 w-full"
                  />
                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                    Agent Name
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
                    Agent Email
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
                <div className="mt-6 relative">
                  <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-black">
                    Select Organization
                  </label>
                  <Select
                    defaultValue={selectedOrganization}
                    isMulti
                    name="colors"
                    className="w-full"
                    options={allAgency.map((agents) => ({
                      value: agents.agencyName,
                      label: agents.agencyName,
                    }))}
                    onChange={handleOrganizationChange}
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
              Total Agent:{" "}
              <span className="text-3xl text-primary font-bold">
                {currentAgency.length}
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
                  <th>Agent Name</th>
                  <th>Agent Email</th>
                  <th>Agency Name</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {agentDataFiltered.map((agents, index) => (
                  <tr key={agents?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={agents?.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{agents?.name}</td>
                    <td>{agents?.email}</td>
                    <td>{agents?.agencyName}</td>
                    <td className="text-base flex justify-center">
                      <button>
                        <div className="mx-auto flex items-center justify-end">
                          <button
                            onClick={() => editAgentData(agents._id, agents)}
                            className="rounded-md bg-green-500 py-3 px-10 text-white"
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
                                onSubmit={updateAgentData}
                                className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 h-96 overflow-y-scroll"
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
                                      name="name"
                                      defaultValue={updateData?.name}
                                      placeholder="Name"
                                      className="border border-black py-3 px-5 w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                      Agent Name
                                    </h1>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="email"
                                      defaultValue={updateData?.email}
                                      placeholder="Email"
                                      className="border border-black py-3 px-5 w-full"
                                    />
                                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                      Agent Email
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
                                  <div>
                                    {" "}
                                    <select
                                      name="agency"
                                      className="w-full px-4 py-3 rounded-md border text-black"
                                    >
                                      {agentData &&
                                        agentData?.map((info) => (
                                          <option
                                            key={info._id}
                                            defaultValue={
                                              updateData
                                                ? updateData.agencyName
                                                : ""
                                            }
                                          >
                                            {info.agencyName}
                                          </option>
                                        ))}
                                    </select>
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
                                  <button
                                    type="submit"
                                    className="border-2 bg-black text-white border-black py-3 px-5 w-full rounded-md"
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
                        onClick={() => handleAgentDelete(agents?.email)}
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
              className="join-agents btn btn-outline btn-primary mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="text-white"> &larr; Previous page</span>
            </button>
            {Array.from(
              { length: Math.ceil(agentDataFiltered.length / HousePerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`join-agents btn btn-outline btn-primary  text-white mr-2 ${
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
              className="join-agents btn btn-outline btn-primary  mr-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(agentDataFiltered.length / HousePerPage)
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

export default ManageAgent;
