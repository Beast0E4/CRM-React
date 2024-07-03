import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSLice";

function HomeLayout( {children}) {

    const authState = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 right-0">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-4 ml-4">
                    <label htmlFor="my-drawer">
                        <GiHamburgerMenu size={'32px'} className="hover:cursor-pointer"/>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li><a>View all tickets</a></li>
                        <li><a>Dashboard</a></li>
                        <li className="absolute bottom-10">
                            <div className="w-full flex justify-center items-center gap-10">
                                {
                                    !authState.isLoggedIn ? (
                                        <>
                                            <Link to={'/login'} className="btn-primary px-7 py-1 bg-cyan-400 font-semibold rounded-md">Login</Link>
                                            <Link to={'/signup'} className="btn-secondary px-5 py-1 bg-cyan-400 font-semibold rounded-md ">Sign Up</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link className="btn-secondary px-7 py-1 bg-cyan-400 rounded-md font-semibold">Profile</Link>
                                            <button className="btn-primary px-7 py-1 bg-cyan-40 bg-cyan-400 font-semibold rounded-md" onClick={onLogout}>Logout</button>
                                        </>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-start">
                <div className="w-3/4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;