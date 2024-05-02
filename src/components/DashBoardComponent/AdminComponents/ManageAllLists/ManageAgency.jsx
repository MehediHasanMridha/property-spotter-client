import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ManageAgency = () => {
  const [showName, setShowName] = useState("");
  const [showImagePreview, setShowImagePreview] = useState("");
  const fileInputRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [agencyData, setAgencyData] = useState([]);
  const [updateAgency, setUpdateAgency] = useState(null);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const handleManageArea = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("agencyName", e.target.name.value);
      formData.append("ownerEmail", e.target.email.value);
      formData.append("password", e.target.password.value);
      if (showName) {
        formData.append("image", showName);
      }
      const response = await axios.post(
        "http://localhost:5000/agency/add-agency",
        formData
      );
      toast.success("added successFully");
      fetchAgency();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  console.log(showName);

  useEffect(() => {
    fetchAgency();
  }, []);

  const fetchAgency = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/agency/agencyData"
      );
      setAgencyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAgencyDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/agency/deleteAgency/${id}`);
      toast.success("deleted");
      fetchAgency();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  //update Agent
  const editAgencyData = (id, item) => {
    setUpdateAgency(item);
    setUpdateOpenModal(true);
  };

const updateAgencyData = async (event) => {
  event.preventDefault();

  const { name, email, password } = event.target.elements;
  const updatedCode = {
      agencyName: name.value,
      ownerEmail: email.value,
      password: password.value,
  };

  if (showName) {
      updatedCode.image = showName; 
  }

  try {
      const id = updateAgency._id; 
      const response = await axios.patch(
          `http://localhost:5000/agency/${id}`,
          updatedCode
      );
      fetchAgency();
      toast.success("Updated");
  } catch (error) {
      console.error("Error:", error);
  }
};
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

      <div className="p-2 mx-auto sm:p-4">
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-base text-left whitespace-nowrap">
            <colgroup>
              <col className="w-5" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-5" />
            </colgroup>
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-6 py-2 text-base  text-left">Image</th>
                <th className="px-6 py-2 text-base  text-left">Agency Name</th>
                <th className="px-6 py-2 text-base  text-left">Owner Email</th>
                <th className="px-6 py-2 text-base  text-left">Action</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {agencyData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td>
                    <img
                      className="rounded-2xl hover:scale-150 transition-transform duration-300 w-12 h-10"
                      src={`http://localhost:5000/image/areas/${item.image}`}
                      alt="area"
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-base">{item.agencyName}</td>
                  <td className="py-4 px-6 border-b text-base ">{item.ownerEmail}</td>
                  <td className="py-4 px-6 border-b text-base flex gap-5">
                    <button className="bg-green-500 rounded-md text-white px-2 py-1.5">
                      <div className="mx-auto flex items-center justify-end">
                        <button
                          onClick={() => editAgencyData(item._id, item)}
                          className="rounded-md bg-green-500 py-3 px-10 text-white">
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
                                    name="name"
                                    defaultValue={updateAgency?.agencyName}
                                    placeholder="Name"
                                    className="border border-black py-3 px-5 text-black w-full"
                                  />
                                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Agency Name
                                  </h1>
                                </div>
                                <div className="relative">
                                  <input
                                    type="text"
                                    name="email"
                                    defaultValue={updateAgency?.ownerEmail}
                                    placeholder="Email"
                                    className="border border-black py-3 text-black px-5 w-full"
                                  />
                                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Owner Email
                                  </h1>
                                </div>
                                <div className="relative">
                                  <input
                                    type="text"
                                    name="password"
                                    defaultValue={updateAgency?.password}
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
                                        File should be in PNG, JPEG, or JPG
                                        format
                                      </p>
                                    </div>
                                  </label>
                                  <input
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
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
                    <button
                      onClick={() => handleAgencyDelete(item._id)}
                      className="bg-red-500 rounded-md text-white px-2 py-1.5"
                    >
                      Remove{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageAgency;
