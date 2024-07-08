import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosinstance";

function UserDetailsModal ({ user, resetTable }) {

    const [userDisplay, setUserDisplay] = useState(user);

    async function handleUserChange(e) {
        const updateToast = toast(`Updating the user ...`);
        try {
            const ul = e.target.parentNode.parentNode;
            const name = ul.getAttribute("name");
            const dropdown = document.getElementById(`${name}Dropdown`);
            dropdown.open = !dropdown.open;
            updateToast;
            const response = await axiosInstance.patch("user/updateUser", {
                userId: userDisplay.id,
                updates: {
                    ...userDisplay,
                    [name]: e.target.textContent.toLowerCase()
                }
            },{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            if(response?.data?.result){
                toast.dismiss(updateToast);
                toast.success(`Successfully updated the user`);
                const user = response?.data?.result;
                setUserDisplay({
                    ...userDisplay,
                    name: user.name,
                    email: user.email,
                    userStatus: user.userStatus,
                    userType: user.userType,
                    clientName: user.clientName,
                });
                resetTable();
            }
        } catch (error) {
            toast.dismiss(updateToast);
            toast.error(`Something went wrong...`);
        }
    }

    return (
        <dialog id="userModal" className="modal py-4">
            <div className="modal-box py-[4rem] px-[2rem]">
                <h3 className="font-bold text-[2rem] text-yellow-600">USER DETAILS</h3>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Name : </span> {userDisplay.name}</p>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Email : </span> {userDisplay.email}</p>
                <div className="flex gap-5">
                    <span><span className="font-bold text-yellow-600 text-lg">Status : </span> 
                        <details className="dropdown py-2" id="userStatusDropdown" style={{zIndex: 10000}}>
                            <summary className="btn m-1 uppercase">{userDisplay.userStatus}</summary>
                            <ul name="userStatus" onClick={handleUserChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Approved</a></li>
                                <li><a>Suspended</a></li>
                                <li><a>Rejected</a></li>
                            </ul>
                        </details>
                    </span>
                    <span><span className="font-bold text-yellow-600 text-lg">Type : </span> 
                        <details className="dropdown py-2" id="userTypeDropdown">
                            <summary className="btn m-1 uppercase">{userDisplay.userType}</summary>
                            <ul name="userType" onClick={handleUserChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Engineer</a></li>
                                <li><a>Customer</a></li>
                                <li><a>Admin</a></li>
                            </ul>
                        </details>
                    </span>
                </div>
                <p className="py-2"><span className="font-bold text-yellow-600 text-lg">Client Name : </span> {userDisplay.clientName}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;