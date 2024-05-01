import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Select } from "antd";

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
  const [updateData, setUpdateData]=useState(null)
  //getAllAgent
  const handleOrganizationChange = (value) => {
    setSelectedOrganization(value);
  };
  // const handleManageAgent = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", e.target.name.value);
  //     formData.append("email", e.target.email.value);
  //     formData.append("password", e.target.password.value);
  //     formData.append("agencyName", selectedOrganization);
  //     console.log(formData);
  //     const response = await axios.post(
  //       "http://localhost:5000/agent/add-agent",
  //       formData
  //     );
  //     setOpenModal(false);
  //     toast.success("Added successfully");
  //     fetchAgent();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleManageAgent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
      formData.append("agencyName", selectedOrganization);
  
     const name = e.target.name.value
     const email = e.target.email.value
     const password = e.target.password.value
      const agencyName =selectedOrganization 

      const data={
     name,
      email,
      password,
      agencyName
      }
      const response = await axios.post("http://localhost:5000/agent",data
      );
  
      if (response.status === 201) {
        setOpenModal(false);
        toast.success("Added successfully");
        fetchAgent();
      } else if (response.status === 400 && response.data.error === "Email already exists") {
        toast.error("Email already exists");
      } else {
        toast.error("Email already exists");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email already exists");
    }
  };
  
  console.log(agentData);

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/agent/agentData");
      setAgentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //update Agent
 const editAgentData=(id, item)=>{
  setUpdateData(item)
  setUpdateOpenModal(true)
 }


//  console.log("hhhhhhhhhhhhhhhh",updateData);

const updateAgentData = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);

  const updatedCode = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    agencyName: formData.get('agency')
  };

  try {
    const id =updateData._id
    const response = await axios.patch(`http://localhost:5000/agent/update/${id}`, updatedCode);
     fetchAgent()
     toast.success("updated")
  } catch (error) {
    console.error('Error:', error);
  }
};

// const updateAgentData = async (event) => {
//   event.preventDefault();
  
//   const formData = new FormData(event.target);

//   const updatedData = {
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     agency: formData.get('agency')
//   };

//   try {
//     await axios.patch('YOUR_API_ENDPOINT', updatedData);

//     // If the request succeeds, this line will be executed
//     console.log('Agent data updated successfully!');
//   } catch (error) {
//     // Handle errors here
//     console.error('Failed to update agent data:', error);
//   }
// };


  //deleteAgent
  const handleAgentDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/agent/deleted/${id}`);
      toast.success("deleted");
      fetchAgent();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

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
            <form
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
                  <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                    Select Organization
                  </label>
                  <Select
                    defaultValue={selectedOrganization}
                    isMulti
                    name="colors"
                    className="w-full"
                    options={colourOptions}
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
              <tr className="bg-primary text-white">
                <th className="px-6 py-2 text-base  text-left">Agent Name</th>
                <th className="px-6 py-2 text-base  text-left">Agent Email</th>
                <th className="px-6 py-2 text-base  text-left">Agency</th>
                <th className="px-6 py-2 text-base  text-left">Action</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {agentData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-4 px-6 border-b text-base">{item?.name}</td>
                  <td className="py-4 px-6 border-b text-base ">
                    {item?.email}
                  </td>
                  <td className="py-4 px-6 border-b text-base">
                    {item?.agency}
                  </td>
                  <td className="py-4 px-6 border-b text-base flex gap-5">
                    <button>
                      <div className="mx-auto flex items-center justify-end">
                        <button
                          onClick={() => editAgentData(item._id, item)}
                          className="rounded-md bg-green-500 py-3 px-10 text-white"
                        >
                          Edit Info
                        </button>
                        <div
                          onClick={() =>setUpdateOpenModal(false)}
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
                                    defaultValue={updateData?.password}
                                    placeholder="*********"
                                    className="border border-black py-3 px-5 w-full"
                                  />
                                  <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Password
                                  </h1>
                                </div>
                              <div>  <select
                                   name="agency"
                                   className="w-full px-4 py-3 rounded-md border text-black">
                                    {agentData && agentData?.map((info) => (
                                      
                                                            <option key={info._id} defaultValue={updateData ? updateData.agency : ""}>
                                                                {info.agency}
                                                            </option>
                                                        ))}

                                                    </select></div>
                                {/* Submit button */}
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
                    <button
                      onClick={() => handleAgentDelete(item._id)}
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

export default ManageAgent;
