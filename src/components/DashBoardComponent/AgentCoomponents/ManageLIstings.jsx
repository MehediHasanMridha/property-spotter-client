import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";


const ManageLIstings = () => {
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
      const response = await axios.get("http://localhost:5000/allusers");
      setAgentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const agentDataFiltered = agentData.filter((item) => item.role === 'agent');

  console.log("agentDataFiltered", agentDataFiltered);
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
              </tr>
            </thead>
            <tbody className="border-b">
              {agentDataFiltered.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-4 px-6 border-b text-base">{item?.name}</td>
                  <td className="py-4 px-6 border-b text-base ">
                    {item?.email}
                  </td>
                  <td className="py-4 px-6 border-b text-base">
                    {item?.agencyName}
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

export default ManageLIstings