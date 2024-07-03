import { GiHamburgerMenu } from "react-icons/gi";

function HomeLayout( {children}) {
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
                                <button className="btn btn-primary px-7 py-0 text-sm">Login</button>
                                <button className="btn btn-secondary px-5 py-0 ">Sign Up</button>
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