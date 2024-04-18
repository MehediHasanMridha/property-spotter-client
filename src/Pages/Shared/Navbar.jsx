import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div className="bg-[#edf7f4]">
            <div className="w-3/4 mx-auto hidden lg:block py-4">
                <div className="flex items-center justify-between">
                    <Link className="w-[60px] flex items-center">
                        <img className="rounded-full" src="logo.jpg" alt="" />
                        <h3 className="text-3xl font-semibold">Property Spotter</h3>
                    </Link>
                    <div className="flex flex-row gap-8 font-semibold">
                        <Link>Home</Link>
                        <Link to={'/admin/users'}>Buy</Link>
                        <Link>Sell</Link>
                        <Link>Residential</Link>
                        <Link to={'/jobseeker/dashboard'}>Commercial</Link>
                    </div>
                    <div>
                        <div className="dropdown pt-1 dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-16 rounded-full border-2 border-[#1d9cb5]">
                                    <img src="" alt="" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" >
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        <div className="flex items-center gap-2">
                                            {/* <CgProfile className="text-lg" /> */}
                                            <p>Profile</p>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/settings" className="justify-between">
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
                        <div className="font-semibold text-center">
                            <div className="flex gap-4 justify-center pb-2">
                                <Link to={'/login'}><button>Login</button></Link>
                                <Link to={'/login'}><button>Signup</button></Link>
                            </div>
                            <div className="">
                                <Link to={'/signup'}><button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Become a spotter</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#edf7f4] lg:hidden block">
                <div className="navbar flex items-center justify-between">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>

                            <div tabIndex={0} className="menu menu-sm dropdown-content font-semibold mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <Link>Home</Link>
                                <Link to={'/admin/users'}>Buy</Link>
                                <Link>Sell</Link>
                                <Link>Residential</Link>
                                <Link to={'/jobseeker/dashboard'}>Commercial</Link>
                                <p></p>
                            </div>
                        </div>
                        <div className="w-[60px] flex items-center">
                            <img className="rounded-full" src="logo.jpg" alt="" />
                            <h3 className="text-2xl font-semibold">airTalX</h3>
                        </div>
                    </div>
                    <div className="dropdown pt-1 dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-16 rounded-full border-2 border-[#1d9cb5]">
                                <img src="" alt="" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* <CgProfile className="text-lg" /> */}
                                        <p>Profile</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings" className="justify-between">
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
                    <div className="font-semibold text-center">
                        <div className="flex gap-4 justify-center pb-2">
                            <Link to={'/login'}><button>Login</button></Link>
                            <Link to={'/login'}><button>Signup</button></Link>
                        </div>
                        <div className="">
                            <Link to={'/signup'}><button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Become a spotter</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;