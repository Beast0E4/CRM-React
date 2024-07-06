import { useEffect, useState } from "react";

import axiosInstance from "../../config/axiosinstance";
import HomeLayout from "../../layouts/homelayout";

function ListAllUsers() {

    const [userList, setUserList] = useState([]);

    async function loadUsers() {
        const response = await axiosInstance.get('/users', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        setUserList(response?.data);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <HomeLayout>

        </HomeLayout>
    );
}

export default ListAllUsers;