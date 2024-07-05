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

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);

function Home() {

    const [ticketState] = useTickets();
    const [openTickets, setOpenTickets] = useState({});

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
        labels: Object.keys(openTickets),
        textColor: 'white',
        datasets: [
            {
                label: "Open Tickets Data",
                data: Object.values(openTickets),
                borderColor: 'red',
                backgroundColor: 'pink'
            }
        ]
    };

    useEffect(() => {
        if(ticketState.ticketList.length > 0) {
            let openTicketData = {};
            ticketState.ticketList.forEach(ticket => {
                const date = ticket.createdAt.split("T")[0];
                if(ticket.status === 'open') openTicketData[date] = (!openTicketData[date] ? 1 : openTicketData[date] + 1);
            });
            setOpenTickets(openTicketData);
        }
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
            <div className="mt-10 flex justify-center items-center">
                <div className="w-[40rem]">
                    <Line data={lineChartData}/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;