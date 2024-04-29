/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import SidebarItem from "../../components/SubMenu/SidebarItem";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const role = "Admin";

  const adminItems = [
    {
      path:"/dashboard",
      title: "Admin",
      icon: "uBuilding",
      childrens: [
        {
          title: "Chat moderate (access to all chats and archives)",
          icon: "uBuilding",
          path: "/chatModerate",
        },
        {
          title: "Manage areas (add or remove areas like province, city etc",
          icon: "uBuilding",
          path: "/dashboard/manageAreas",
        },
        {
          title: "Manage search filters",
          icon: "uBuilding",
          path: "/dashboard/manageSearchFilters",
        },
        {
          title: "Manage all listings",
          icon: "uBuilding",
          path:"/dashboard/ManageAllListings",
          childrens: [
            {
              title: "Manage listing by Agency",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/manageListingByAgency",
            },
            {
              title: "Manage listing by Agent",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/manageAreas",
            },
            {
              title: "Manage listing by Spotter (include the listing status)",
              icon: "uBuilding",
              childrens: [
                {
                  title: "SOLD",
                  icon: "uBuilding",
                  path: "/sold",
                },
                {
                  title: "AVAILABLE",
                  icon: "uBuilding",
                  path: "/available",
                },
                {
                  title: "OFFER PENDING",
                  icon: "uBuilding",
                  path: "/OFFER PENDING",
                },
                {
                  title: "HOLD",
                  icon: "uBuilding",
                  path: "/HOLD",
                },
                {
                  title: "PENDING MANDATE",
                  icon: "uBuilding",
                  path: "/PENDINGMANDATE",
                },
                {
                  title: "PENDING CONTACT WITH CLIENT)",
                  icon: "uBuilding",
                  path: "/PENDING CONTACT WITH CLIENT",
                },
              ],
            },
            {
              title: "Manage Agencies (add remove or edit)",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/manageAgencies",
            },
            {
              title: "Manage Agents (add remove or edit)",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/manageAgents",
            },
            {
              title: "Manage Spotters",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/manageSpotters",
            },
            {
              title: "Profile",
              icon: "uBuilding",
              path: "/dashboard/ManageAllListings/profile",
            },
          ],
        },
      ],
    },
  ];

  const agencyItems = [
    {
      title: "Agency",
      icon: "lu/LuTableProperties",
      childrens: [
        {
          title: "Manage Listings",
          icon: "uBuilding",
          path: "/chatModerate",
        },
        {
          title: "Manage listings by agent",
          icon: "uBuilding",
          path: "/manageAreas",
        },
        {
          title: "Manage listings by spotter",
          icon: "uBuilding",
          path: "/manageSearchFilters",
        },
        {
          title: "Pending spotted listings",
          icon: "uBuilding",
          childrens: [
            {
              title: "Manage listing by Agency",
              icon: "uBuilding",
              path: "/manageListingByAgency",
            },
            {
              title: "Manage listing by Agent",
              icon: "uBuilding",
              path: "/manageAreas",
            },
          ],
        },
        {
          title: "Profile",
          icon: "uBuilding",
          path: "/profile",
        },
      ],
    },
  ];

  const agentItems = [
    {
      title: "Agent",
      icon: "lu/LuTableProperties",
      childrens: [
        {
          title: "Manage listings",
          icon: "uBuilding",
          childrens: [
            {
              title: " This is only the agents listings",
              icon: "uBuilding",
              path: "/manageListingByAgency",
            },
          ],
        },
        {
          title: "Pending Spotted listings",
          icon: "uBuilding",
          path: "/Pending Spotted listings",
        },
        {
          title: "Profile",
          icon: "Luuilding",
          path: "/profile",
        },
      ],
    },
  ];

  return (
    <>
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 z-20 transition-opacity  bg-black opacity-50 lg:hidden ${sidebarOpen ? "block" : "hidden"
          }`}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-80 flex flex-col border dark:border-slate-800 bg-[#0c1427] min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          }`}
      >
        <div className="flex items-center justify-center border-b border-slate-800 py-3">
          <h3 className="text-xl text-white font-semibold">
            Property<span className="text-primary"> Spotted</span>
          </h3>
        </div>
        <div className="overflow-y-auto custom-scroll">
          <nav className="mt-5 px-3">
            <ul>
              {role === "Admin" &&
                adminItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}
              {role === "Agency" &&
                agencyItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}
              {role === "Agent" &&
                agentItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
};

export default Sidebar;