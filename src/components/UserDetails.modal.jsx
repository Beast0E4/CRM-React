import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosinstance";

function UserDetailsModal ({ user, resetTable }) {

    const [userDisplay, setUserDisplay] = useState(user);

    async function handleStatusChange(e) {
        try {
            const dropdown = document.getElementById('userStatus-dropdown');
            dropdown.open = !dropdown.open;
            toast(`Updating the user ...`);
            const response = await axiosInstance.patch("user/updateUser", {
                userId: userDisplay.id,
                updates: {
                    ...userDisplay,
                    userStatus: e.target.textContent.toLowerCase()
                }
            },{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            if(response?.data?.result){
                toast.success(`Successfully updated the user`);
                const user = response?.data?.result;
                setUserDisplay({
                    name: user.name,
                    email: user.email,
                    userStatus: user.userStatus,
                    userType: user.userType,
                    clientName: user.clientName
                });
                resetTable();
            }
        } catch (error) {
            toast.error(`Something went wrong...`);
        }
    }

    return (
        <dialog id="userModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-yellow-600">USER DETAILS</h3>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Name : </span> {userDisplay.name}</p>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Email : </span> {userDisplay.email}</p>
                <span className="py-2"><span className="font-bold text-yellow-600 text-lg">Status : </span> 
                    <details className="dropdown py-2" id="userStatus-dropdown">
                        <summary className="btn m-1 uppercase">{userDisplay.userStatus}</summary>
                        <ul onClick={handleStatusChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Approved</a></li>
                            <li><a>Suspended</a></li>
                            <li><a>Rejected</a></li>
                        </ul>
                    </details>
                </span>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Type : </span> {userDisplay.userType}</p>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Client Name : </span> {userDisplay.clientName}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;