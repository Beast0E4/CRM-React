import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import TicketDetailsModal from "../components/TicketDetails.modal";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/homelayout";

function Dashboard() {

    const [ticketState] = useTickets();
    const [selectedTicket, setSelectedTicket] = useState({});

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            sortable: true
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
        },
        {
            name: 'Status',
            selector: row => row.status,
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

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2" id="table">
                <div className="bg-[#3FA2F6] text-black w-full text-center text-3xl p-4 font-bold">
                    Tickets Records 
                </div>
                <div className="w-full ">
                    {ticketState && <DataTable
                        onRowClicked={(row) => {
                            setSelectedTicket(row)
                            document.getElementById('ticket_modal').showModal();
                        }}
                        columns={columns}
                        data={ticketState.ticketList}
                        expandableRows 
                        expandableRowsComponent={ExpandedComponent}
                        highlightOnHover
                        pagination
                        theme="solarized"
                    />}
                    <TicketDetailsModal ticket={selectedTicket}/>
                </div>

            </div>
        </HomeLayout>
    );

}

export default Dashboard;