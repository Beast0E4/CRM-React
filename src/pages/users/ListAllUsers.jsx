import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import axiosInstance from "../../config/axiosinstance";
import HomeLayout from "../../layouts/homelayout";

function ListAllUsers() {

    const columns = [
        {
            name: 'User ID',
            selector: row => row._id,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            sortable: true
        }
    ];

    createTheme('solarized', {
        text: {
          primary: '#268bd2',
          secondary: '#2aa198',
        },
        background: {
          default: 'BBE9FF',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

    const [userList, setUserList] = useState([]);

    async function loadUsers() {
        const response = await axiosInstance.get('/users', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        setUserList(response?.data?.result);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center">
                <div className="bg-[#3FA2F6] text-black w-full text-center text-3xl p-4 font-bold">
                    Users Records 
                </div>
                {userList && <DataTable
                    columns={columns}
                    data={userList}
                    theme="solarized"
                />}
            </div>
        </HomeLayout>
    );
}

export default ListAllUsers;