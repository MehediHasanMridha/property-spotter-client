import { useEffect, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { LuMenu, LuX } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [user, setUser] = useState(false);
    const [isMenuOpen, setIsMenuOPen] = useState(false);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            return setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header
            className={`backdrop-blur-[8px] w-full top-0 ${
                scrollY > 200 ? "sticky shadow-md animate" : ""
            } transition-all duration-300 bg-white`}
            style={{ zIndex: 9999 }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-5 py-3.5 px-6 lg:px-0">
                    <Link to={"/"} className="flex items-center">
                        <svg
                            id="logo-12"
                            width="138"
                            height="30"
                            viewBox="0 0 138 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {" "}
                            <path
                                d="M20.99 23.759L3.05 11.384C1.232 10.13 1.85 7.51898 4.117 6.90498L23.184 1.72998C23.5879 1.58424 24.0207 1.53693 24.4466 1.59198C24.8724 1.64703 25.279 1.80285 25.6326 2.04651C25.9861 2.29017 26.2765 2.61464 26.4795 2.99299C26.6825 3.37134 26.7924 3.79266 26.8 4.22198L25.67 21.771C25.536 23.854 22.808 25.013 20.99 23.759Z"
                                className="ccompli2"
                                fill="#E9327C"
                            ></path>{" "}
                            <path
                                d="M15.3 26.814L4.73098 6.14504C4.48938 5.6722 4.38307 5.14181 4.42376 4.61238C4.46445 4.08295 4.65057 3.57504 4.96158 3.14467C5.2726 2.7143 5.69643 2.37818 6.18634 2.17338C6.67625 1.96858 7.2132 1.90306 7.73798 1.98405L27.325 5.00704C27.7759 5.07665 28.2039 5.2523 28.5738 5.51955C28.9436 5.78681 29.2447 6.13803 29.4524 6.54434C29.66 6.95065 29.7683 7.40044 29.7682 7.85674C29.7681 8.31303 29.6597 8.7628 29.452 9.16904L20.429 26.815C20.1867 27.2865 19.8191 27.6821 19.3666 27.9582C18.9141 28.2344 18.3943 28.3804 17.8642 28.3803C17.3341 28.3802 16.8143 28.234 16.3619 27.9577C15.9095 27.6813 15.5421 27.2856 15.3 26.814V26.814Z"
                                className="ccompli1"
                                fill="#1DACE3"
                            ></path>{" "}
                            <path
                                d="M26.752 4.91801L16.988 3.41101L5 6.66601L9.785 16.027L20.99 23.759C21.2372 23.9277 21.5091 24.0569 21.796 24.142L26.052 15.819L26.752 4.91801Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M76.209 7.33402C76.209 6.97109 76.3166 6.61632 76.5182 6.31455C76.7199 6.01279 77.0065 5.77759 77.3418 5.6387C77.6771 5.49982 78.046 5.46348 78.402 5.53428C78.7579 5.60509 79.0849 5.77986 79.3415 6.03648C79.5982 6.29311 79.7729 6.62008 79.8437 6.97603C79.9145 7.33199 79.8782 7.70095 79.7393 8.03625C79.6004 8.37155 79.3652 8.65814 79.0635 8.85977C78.7617 9.0614 78.4069 9.16902 78.044 9.16902C77.5588 9.16408 77.095 8.96916 76.7519 8.6261C76.4089 8.28303 76.2139 7.81916 76.209 7.33402V7.33402ZM76.515 10.066H79.574V20.26H76.515V10.066Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M92.7839 15.163C92.8195 15.8368 92.7214 16.511 92.4955 17.1468C92.2695 17.7825 91.9201 18.3674 91.4674 18.8677C91.0146 19.3679 90.4674 19.7737 89.8572 20.0618C89.247 20.3498 88.5859 20.5144 87.9119 20.546C87.345 20.5768 86.7783 20.4812 86.2528 20.2661C85.7274 20.0509 85.2564 19.7216 84.8739 19.302V24.338H81.8159V10.066H84.8739V11.024C85.2565 10.6045 85.7275 10.2754 86.253 10.0604C86.7784 9.84545 87.3451 9.74999 87.9119 9.78098C88.5859 9.81247 89.2469 9.97691 89.8571 10.2648C90.4673 10.5528 91.0145 10.9585 91.4673 11.4587C91.9201 11.9589 92.2695 12.5436 92.4955 13.1794C92.7214 13.8151 92.8195 14.4892 92.7839 15.163ZM89.7259 15.163C89.7139 14.6857 89.5614 14.2226 89.2875 13.8315C89.0136 13.4405 88.6304 13.1389 88.186 12.9646C87.7415 12.7902 87.2555 12.7509 86.7888 12.8514C86.3221 12.9519 85.8953 13.1878 85.562 13.5296C85.2287 13.8714 85.0036 14.304 84.9149 14.7731C84.8262 15.2422 84.8779 15.7271 85.0634 16.167C85.2489 16.6069 85.56 16.9823 85.9578 17.2463C86.3557 17.5103 86.8225 17.651 87.2999 17.651C87.6278 17.6658 87.955 17.611 88.2602 17.4904C88.5654 17.3697 88.8416 17.1858 89.0707 16.9509C89.2998 16.7159 89.4766 16.4352 89.5896 16.127C89.7025 15.8189 89.749 15.4903 89.7259 15.163V15.163Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M102.223 17.2C102.223 19.545 100.184 20.544 97.9821 20.544C97.0926 20.6245 96.1993 20.4362 95.4179 20.0035C94.6365 19.5709 94.003 18.9137 93.5991 18.117L96.2491 16.609C96.3569 16.9773 96.5877 17.2974 96.9032 17.5158C97.2186 17.7342 97.5995 17.8377 97.9821 17.809C98.7161 17.809 99.0821 17.584 99.0821 17.177C99.0821 16.055 94.0671 16.647 94.0671 13.119C94.0671 10.897 95.9421 9.776 98.0671 9.776C98.8642 9.75098 99.6533 9.94011 100.352 10.3237C101.052 10.7073 101.635 11.2713 102.042 11.957L99.4331 13.364C99.319 13.0964 99.1286 12.8683 98.8857 12.7083C98.6427 12.5482 98.358 12.4633 98.0671 12.464C97.5371 12.464 97.2111 12.664 97.2111 13.035C97.2081 14.205 102.223 13.43 102.223 17.2Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M113.4 10.066V20.26H110.342V19.3C109.989 19.7229 109.54 20.0561 109.033 20.2724C108.527 20.4886 107.976 20.5817 107.426 20.544C105.367 20.544 103.614 19.076 103.614 16.323V10.066H106.672V15.877C106.646 16.12 106.674 16.3657 106.753 16.5969C106.832 16.8281 106.96 17.0394 107.129 17.216C107.298 17.3926 107.503 17.5302 107.73 17.6193C107.958 17.7085 108.202 17.7469 108.446 17.732C109.567 17.732 110.346 17.08 110.346 15.632V10.066H113.4Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M130.928 14V20.26H127.87V14.266C127.87 13.247 127.38 12.594 126.402 12.594C125.382 12.594 124.812 13.308 124.812 14.511V20.26H121.753V14.266C121.753 13.247 121.264 12.594 120.285 12.594C119.266 12.594 118.695 13.308 118.695 14.511V20.26H115.637V10.066H118.7V11C119.017 10.5841 119.433 10.2543 119.91 10.0406C120.387 9.827 120.911 9.73636 121.432 9.77701C121.955 9.75142 122.477 9.86186 122.945 10.0976C123.413 10.3333 123.812 10.6862 124.103 11.122C124.442 10.6661 124.891 10.3035 125.408 10.0683C125.925 9.83305 126.494 9.73284 127.06 9.77701C129.4 9.78101 130.928 11.452 130.928 14Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M133.519 10.003C134.773 10.003 135.789 8.9867 135.789 7.73301C135.789 6.47933 134.773 5.46301 133.519 5.46301C132.265 5.46301 131.249 6.47933 131.249 7.73301C131.249 8.9867 132.265 10.003 133.519 10.003Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                            <path
                                d="M34.457 5.37695H37.516V20.26H34.457V5.37695ZM39.248 15.163C39.2447 14.0942 39.5585 13.0485 40.1498 12.1583C40.7411 11.268 41.5833 10.5732 42.5697 10.1619C43.5562 9.75058 44.6424 9.64121 45.6911 9.84765C46.7397 10.0541 47.7035 10.567 48.4604 11.3216C49.2173 12.0761 49.7333 13.0382 49.943 14.0862C50.1527 15.1342 50.0468 16.2208 49.6386 17.2085C49.2304 18.1962 48.5383 19.0406 47.6499 19.6347C46.7615 20.2288 45.7168 20.546 44.648 20.546C43.9382 20.5535 43.234 20.4196 42.5765 20.152C41.9191 19.8844 41.3215 19.4884 40.8188 18.9873C40.316 18.4861 39.9182 17.8898 39.6485 17.2332C39.3788 16.5766 39.2427 15.8728 39.248 15.163V15.163ZM46.996 15.163C46.984 14.7019 46.8364 14.2547 46.5715 13.8772C46.3067 13.4997 45.9364 13.2086 45.507 13.0404C45.0775 12.8723 44.6081 12.8344 44.1573 12.9317C43.7065 13.0289 43.2944 13.257 42.9725 13.5872C42.6506 13.9175 42.4333 14.3353 42.3476 14.7884C42.262 15.2416 42.3118 15.7099 42.491 16.1349C42.6701 16.5598 42.9706 16.9225 43.3548 17.1776C43.739 17.4327 44.1899 17.5688 44.651 17.569C44.9668 17.578 45.2811 17.5214 45.5739 17.4029C45.8668 17.2845 46.1319 17.1066 46.3526 16.8805C46.5733 16.6545 46.7448 16.3852 46.8562 16.0896C46.9676 15.7939 47.0166 15.4784 47 15.163H46.996ZM62.245 10.063V19.748C62.245 23.173 59.574 24.62 56.863 24.62C55.9088 24.692 54.9531 24.4999 54.1007 24.0647C53.2484 23.6296 52.5323 22.9681 52.031 22.153L54.64 20.644C54.8506 21.0694 55.1861 21.4204 55.6016 21.6501C56.0171 21.8797 56.4927 21.977 56.965 21.929C57.2665 21.9701 57.5733 21.9431 57.8629 21.8498C58.1525 21.7565 58.4174 21.5995 58.6382 21.3901C58.8589 21.1808 59.0298 20.9246 59.1383 20.6403C59.2468 20.3561 59.2901 20.0511 59.265 19.748V18.81C58.9068 19.248 58.4509 19.596 57.934 19.8261C57.417 20.0562 56.8533 20.162 56.288 20.135C54.9425 20.0931 53.666 19.5292 52.729 18.5626C51.792 17.596 51.268 16.3027 51.268 14.9565C51.268 13.6102 51.792 12.3169 52.729 11.3503C53.666 10.3837 54.9425 9.81977 56.288 9.77795C56.8533 9.75091 57.417 9.85667 57.934 10.0868C58.4509 10.3169 58.9068 10.6649 59.265 11.103V10.063H62.245ZM59.269 14.956C59.2892 14.4636 59.1616 13.9765 58.9027 13.5572C58.6438 13.1379 58.2654 12.8056 57.8161 12.6031C57.3669 12.4006 56.8673 12.3371 56.3817 12.4208C55.8961 12.5045 55.4466 12.7315 55.091 13.0727C54.7354 13.4139 54.49 13.8536 54.3864 14.3353C54.2827 14.8171 54.3255 15.3188 54.5093 15.7761C54.693 16.2333 55.0094 16.6251 55.4176 16.9011C55.8258 17.1771 56.3073 17.3247 56.8 17.325C57.1213 17.3475 57.4438 17.3026 57.7467 17.1931C58.0496 17.0836 58.3262 16.9119 58.5588 16.689C58.7913 16.4662 58.9747 16.1971 59.097 15.8992C59.2193 15.6012 59.2779 15.2809 59.269 14.959V14.956ZM63.977 15.156C63.9737 14.0872 64.2875 13.0415 64.8788 12.1513C65.4701 11.261 66.3123 10.5662 67.2987 10.1549C68.2852 9.74358 69.3714 9.63421 70.4201 9.84065C71.4687 10.0471 72.4324 10.56 73.1894 11.3146C73.9463 12.0691 74.4623 13.0312 74.672 14.0792C74.8817 15.1272 74.7758 16.2138 74.3676 17.2015C73.9594 18.1892 73.2673 19.0336 72.3789 19.6277C71.4905 20.2218 70.4458 20.539 69.377 20.539C68.6678 20.5465 67.9642 20.4128 67.3072 20.1456C66.6502 19.8785 66.0529 19.4831 65.5503 18.9827C65.0476 18.4823 64.6497 17.8869 64.3796 17.231C64.1094 16.5752 63.9726 15.8722 63.977 15.163V15.156ZM71.725 15.156C71.7132 14.6947 71.5656 14.2471 71.3008 13.8692C71.0359 13.4914 70.6654 13.2001 70.2358 13.0317C69.8061 12.8633 69.3364 12.8254 68.8853 12.9227C68.4342 13.0199 68.0218 13.2481 67.6998 13.5785C67.3777 13.909 67.1602 14.3271 67.0746 14.7805C66.9889 15.2339 67.0389 15.7026 67.2182 16.1277C67.3976 16.5529 67.6983 16.9157 68.0828 17.1709C68.4674 17.426 68.9186 17.562 69.38 17.562C69.6949 17.5703 70.008 17.5136 70.2999 17.3953C70.5918 17.277 70.8561 17.0996 71.0763 16.8744C71.2964 16.6492 71.4677 16.3809 71.5793 16.0864C71.691 15.7919 71.7406 15.4775 71.725 15.163V15.156Z"
                                className="ccustom"
                                fill="#001A49"
                            ></path>{" "}
                        </svg>
                    </Link>
                    <div className="md:hidden flex items-center gap-2">
                        <div className="">
                            <Link to={"/signup"}>
                                <button className="inline-flex justify-center items-center bg-primary text-white text-sm font-medium rounded-md gap-2 px-3.5 h-12">
                                    <GrUserManager size={18} />
                                    Become A Spotter
                                </button>
                            </Link>
                        </div>
                        <button onClick={() => setIsMenuOPen(!isMenuOpen)}>
                            {!isMenuOpen ? (
                                <LuMenu size={20} />
                            ) : (
                                <LuX size={20} />
                            )}
                        </button>
                    </div>
                    <ul className="hidden md:flex flex-row gap-8 *:font-medium mr-auto px-10 *:text-sm ">
                        <li>
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary border-b border-primary py-1"
                                        : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/buy"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary border-b border-primary py-1"
                                        : ""
                                }
                            >
                                Buy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/sell"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary border-b border-primary py-1"
                                        : ""
                                }
                            >
                                Sell
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/residential"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary border-b border-primary py-1"
                                        : ""
                                }
                            >
                                Residential
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/commercial"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary border-b border-primary py-1"
                                        : ""
                                }
                            >
                                Commercial
                            </NavLink>
                        </li>
                    </ul>
                    <div className="hidden md:block">
                        {user ? (
                            <div className="dropdown pt-1 dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-16 rounded-full border-2 border-[#1d9cb5]">
                                        <img src="" alt="" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="justify-between"
                                        >
                                            <div className="flex items-center gap-2">
                                                {/* <CgProfile className="text-lg" /> */}
                                                <p>Profile</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/settings"
                                            className="justify-between"
                                        >
                                            <div className="flex items-center gap-2">
                                                {/* <FiSettings className="text-lg" /> */}
                                                <p>Settings</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2">
                                            {/* <FiLogOut className="text-lg" /> */}
                                            <p>Logout</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center gap-1 font-medium *:text-[#8a98a9] *:text-sm">
                                    <span className="svg-icon svg-icon-2hx me-1">
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                                                fill="currentColor"
                                            ></path>
                                            <rect
                                                x="7"
                                                y="6"
                                                width="4"
                                                height="4"
                                                rx="2"
                                                fill="currentColor"
                                            ></rect>
                                        </svg>
                                    </span>
                                    <Link to={"/login"}>
                                        <button>Login</button>
                                    </Link>
                                    <span>or</span>
                                    <Link to={"/login"}>
                                        <button>Signup</button>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link to={"/signup"}>
                                        <button className="inline-flex justify-center items-center bg-primary text-white text-sm font-medium rounded-md gap-2 px-3.5 h-12">
                                            <GrUserManager size={18} />
                                            Become A Spotter
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`${
                        isMenuOpen ? "" : "hidden"
                    } lg:hidden h-screen w-full`}
                >
                    <div className="flex justify-center items-center pb-10">
                        <ul className="flex flex-col *:text-center gap-5 py-10 px-6 *:text-gray-800">
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary border-b border-primary py-1"
                                            : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/buy"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary border-b border-primary py-1"
                                            : ""
                                    }
                                >
                                    Buy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/sell"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary border-b border-primary py-1"
                                            : ""
                                    }
                                >
                                    Sell
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/residential"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary border-b border-primary py-1"
                                            : ""
                                    }
                                >
                                    Residential
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/commercial"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary border-b border-primary py-1"
                                            : ""
                                    }
                                >
                                    Commercial
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
