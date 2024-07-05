import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { FaPencilAlt } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

import Card from "../../components/card";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/homelayout";
import { BsBorderWidth } from "react-icons/bs";

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);

function Home() {

    const [ticketState] = useTickets();
    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [],
        inProgressTickets: [],
        resolvedTickets: []
    });

    const pieChartData = {
        labels: Object.keys(ticketState?.ticketDistribution),
        textColor: 'white',
        datasets: [
            {
                label: "Ticket Data",
                data: Object.values(ticketState?.ticketDistribution),
                backgroundColor: ['yellow', 'blue', 'white', 'red', 'purple'],
                borderColor: ['yellow', 'blue', 'white', 'red', 'purple']
            }
        ]
    };

    const lineChartData = {
        labels: Object.keys(ticketsChartData.openTickets),
        textColor: 'white',
        datasets: [
            {
                label: "Open Tickets Data",
                data: Object.values(ticketsChartData.openTickets),
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1
            },
            {
                label: "In Progress Tickets Data",
                data: Object.values(ticketsChartData.inProgressTickets),
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 2
            },
            {
                label: "Resolved Tickets Data",
                data: Object.values(ticketsChartData.resolvedTickets),
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 4
            }
        ]
    };

    function processOpenTickets() {
        const currDate = new Date();
        const tenthDayFromToday = new Date();
        tenthDayFromToday.setDate(currDate.getDate() - 10);
        if(ticketState.ticketList.length > 0) {
            let openTicketData = {};
            let inProgressTicketData = {};
            let resolvedTicketData = {};
            for(let i = 0; i < 10; i ++){
                const dateObject = new Date();
                dateObject.setDate(currDate.getDate() - i);
                openTicketData[dateObject.toISOString().split("T")[0].split("/").reverse().join("-")] = 0;
                inProgressTicketData[dateObject.toISOString().split("T")[0].split("/").reverse().join("-")] = 0;
                resolvedTicketData[dateObject.toISOString().split("T")[0].split("/").reverse().join("-")] = 0;
            }
            ticketState.ticketList.forEach(ticket => {
                const date = ticket.createdAt.split("T")[0];
                const ticketDate = new Date(ticket.createdAt);
                if(ticket.status === 'open' && ticketDate >= tenthDayFromToday) 
                    openTicketData[date] = openTicketData[date] + 1;
                if(ticket.status === 'inProgress' && ticketDate >= tenthDayFromToday) 
                    inProgressTicketData[date] = inProgressTicketData[date] + 1;
                if(ticket.status === 'resolved' && ticketDate >= tenthDayFromToday) 
                    resolvedTicketData[date] = resolvedTicketData[date] + 1;
            });
            setTicketsChartData({
                openTickets: openTicketData,
                inProgressTickets: inProgressTicketData,
                resolvedTickets: resolvedTicketData
            });
        }
    }

    useEffect(() => {
        processOpenTickets();        
    }, [ticketState.ticketList]);


    return (
        <HomeLayout>
            {ticketState && (
                <div className="flex flex-row gap-5 justify-center items-center flex-wrap mt-10">
                <Card 
                    titleText="Open"
                    status={ticketState.ticketList.length ? (ticketState.ticketDistribution.open / ticketState.ticketList.length * 100).toFixed(2) : 0}
                    quantity={ticketState.ticketDistribution.open}
                >
                    <FaPencilAlt className="inline mr-2"/>
                </Card>
                <Card 
                    titleText="In Progress"
                    status={ticketState.ticketList.length ? (ticketState.ticketDistribution.inProgress / ticketState.ticketList.length * 100).toFixed(2) : 0}
                    quantity={ticketState.ticketDistribution.inProgress}
                    backgorund="bg-orange-300"
                    borderColor="border-orange-400"
                >
                    <GrInProgress className="inline mr-2"/>
                </Card>
                <Card 
                    titleText="Resolved"
                    status={ticketState.ticketList.length ? (ticketState.ticketDistribution.resolved / ticketState.ticketList.length * 100).toFixed(2) : 0}
                    quantity={ticketState.ticketDistribution.resolved}
                    backgorund="bg-green-300"
                    borderColor="border-green-500"
                >
                    <IoMdDoneAll className="inline mr-2"/>
                </Card>
                <Card 
                    titleText="On Hold"
                    status={ticketState.ticketList.length ? (ticketState.ticketDistribution.onHold / ticketState.ticketList.length * 100).toFixed(2) : 0}
                    quantity={ticketState.ticketDistribution.onHold}
                    backgorund="bg-accent"
                    borderColor="border-red-500"
                >
                    <MdPending className="inline mr-2"/>
                </Card>
                <Card 
                    titleText="Cancelled"
                    status={ticketState.ticketList.length ? (ticketState.ticketDistribution.cancelled / ticketState.ticketList.length * 100).toFixed(2) : 0}
                    quantity={ticketState.ticketDistribution.cancelled}
                    backgorund="bg-red-300"
                    borderColor="border-red-400"
                >
                    <TiCancel className="inline mr-2"/>
                </Card>
            </div>
            )}
            <div className="mt-10 flex justify-center items-center">
                <div className="w-80 h-80">
                    <Pie data={pieChartData} />
                </div>
            </div>
            <div className="mt-10 flex justify-center items-center ">
                <div className="w-[50rem] py-8">
                    <Line data={lineChartData} className="bg-yellow-100"/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;