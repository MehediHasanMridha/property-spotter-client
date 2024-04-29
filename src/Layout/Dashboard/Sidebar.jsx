/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import SidebarItem from "../../components/SubMenu/SidebarItem";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const role = "Admin";

  const adminItems = [
    {
      title: "Admin",
      icon: "lu/LuTableProperties",
      childrens: [
        {
          title: "Chat moderate (access to all chats and archives)",
          icon: "bi-facebook",
          path: "/chatModerate",
        },
        {
          title: "Manage areas (add or remove areas like province, city etc",
          icon: "bi-twitter",
          path: "/manageAreas",
        },
        {
          title: "Manage search filters",
          icon: "bi-twitter",
          path: "/manageSearchFilters",
        },
        {
          title: "Manage all listings",
          icon: "bi-twitter",
          childrens: [
            {
              title: "Manage listing by Agency",
              icon: "bi-facebook",
              path: "/manageListingByAgency",
            },
            {
              title: "Manage listing by Agent",
              icon: "bi-twitter",
              path: "/manageAreas",
            },
            {
              title: "Manage listing by Spotter (include the listing status)",
              icon: "bi-twitter",
              childrens: [
                {
                  title: "SOLD",
                  icon: "bi-twitter",
                  path: "/sold",
                },
                {
                  title: "AVAILABLE",
                  icon: "bi-twitter",
                  path: "/available",
                },
                {
                  title: "OFFER PENDING",
                  icon: "bi-twitter",
                  path: "/OFFER PENDING",
                },
                {
                  title: "HOLD",
                  icon: "bi-twitter",
                  path: "/HOLD",
                },
                {
                  title: "PENDING MANDATE",
                  icon: "bi-twitter",
                  path: "/PENDINGMANDATE",
                },
                {
                  title: "PENDING CONTACT WITH CLIENT)",
                  icon: "bi-twitter",
                  path: "/PENDING CONTACT WITH CLIENT",
                },
              ],
            },
            {
              title: "Manage Agencies (add remove or edit)",
              icon: "bi-twitter",
              path: "/manageAgencies",
            },
            {
              title: "Manage Agents (add remove or edit)",
              icon: "bi-twitter",
              path: "/manageAgents",
            },
            {
              title: "Manage Spotters",
              icon: "bi-twitter",
              path: "/manageSpotters",
            },
            {
              title: "Abuse Reports",
              icon: "bi-twitter",
              path: "/manageAgencies",
            },
            {
              title: "Profile",
              icon: "bi-twitter",
              path: "/profile",
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
          icon: "bi-facebook",
          path: "/chatModerate",
        },
        {
          title: "Manage listings by agent",
          icon: "bi-twitter",
          path: "/manageAreas",
        },
        {
          title: "Manage listings by spotter",
          icon: "bi-twitter",
          path: "/manageSearchFilters",
        },
        {
          title: "Pending spotted listings",
          icon: "bi-twitter",
          childrens: [
            {
              title: "Manage listing by Agency",
              icon: "bi-facebook",
              path: "/manageListingByAgency",
            },
            {
              title: "Manage listing by Agent",
              icon: "bi-twitter",
              path: "/manageAreas",
            },
          ],
        },
        {
          title: "Profile",
          icon: "bi-twitter",
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
          icon: "bi-twitter",
          childrens: [
            {
              title: " This is only the agents listings",
              icon: "bi-facebook",
              path: "/manageListingByAgency",
            },
          ],
        },
        {
          title: "Pending Spotted listings",
          icon: "bi-twitter",
          path: "/Pending Spotted listings",
        },
        {
          title: "Profile",
          icon: "bi-twitter",
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
