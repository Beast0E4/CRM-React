import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/card";
import HomeLayout from "../../layouts/homelayout";
import { getAllTicketsForTheUser } from "../../Redux/Slices/TicketSlice";

function Home() {

    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    async function loadTickets(){
        const response = await dispatch(getAllTicketsForTheUser());
        console.log(response);
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token]);

    return (
        <HomeLayout>
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
        </HomeLayout>
    );
}

export default Home;