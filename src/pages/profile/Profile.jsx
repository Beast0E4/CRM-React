import { useSelector } from "react-redux";

import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/homelayout";

function Profile() {

    useTickets();
    const auth = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh]">
                <div className="bg-transparent w-[80vh] shadow overflow-hidden sm:rounded-lg p-3">
                    <div className="px-4 py-5 sm:px-6 bg-blue-400">
                        <h3 className="text-4xl leading-6 font-bold text-black">
                            Profile
                        </h3>
                    </div>
                    <div>
                        <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-[#268bd2]">
                                    Name:
                                </dt>
                                <dd className="mt-1 text-sm text-[##2aa198] sm:mt-0 sm:col-span-2">
                                    {auth.data.name}
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-[#268bd2]">
                                    Email: 
                                </dt>
                                <dd className="mt-1 text-sm text-[##2aa198] sm:mt-0 sm:col-span-2">
                                    {auth.data.email}
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-[#268bd2]">
                                    Role:
                                </dt>
                                <dd className="mt-1 text-sm text-[##2aa198] sm:mt-0 sm:col-span-2">
                                    {auth.data.userType}
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-[#268bd2]">
                                    Client Name:
                                </dt>
                                <dd className="mt-1 text-sm text-[##2aa198] sm:mt-0 sm:col-span-2">
                                    {auth.data.clientName}
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-[#268bd2]">
                                    Status:
                                </dt>
                                <dd className="mt-1 text-sm text-[##2aa198] sm:mt-0 sm:col-span-2">
                                    {auth.data.userStatus}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;