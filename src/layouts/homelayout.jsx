import { useEffect } from "react";
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

    useEffect(() => {
        if(!authState.isLoggedIn) navigate('/login');
    }, []);


    return (
        <div className="min-h-[90vh] py-4">
            <div className="drawer absolute left-0 right-0" style={{zIndex: 10000}}>
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ml-4">
                    <label htmlFor="my-drawer">
                        <GiHamburgerMenu size={'32px'} className="hover:cursor-pointer"/>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        {authState.role === 'admin' && <li><Link to={'/users'}>View all users</Link></li>}
                        {authState.isLoggedIn && <li><Link to={'/ticket/create'}>Create ticket</Link></li>}
                        <li className="absolute bottom-10">
                            <div className="w-full flex justify-center items-center gap-8">
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