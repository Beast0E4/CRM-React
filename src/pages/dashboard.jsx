import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/homelayout";

function Dashboard() {

    const [ticketState] = useTickets();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                <div className="bg-blue-500 text-black w-full text-center text-3xl p-4 font-bold">
                    Tickets Records
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center gap-3 bg-blue-600 py-2 border-b-4 border-black">
                        <div className="table-title basis-[8%]">
                            ID
                        </div>
                        <div className="table-title basis-[12%]">
                            Title
                        </div>
                        <div className="table-title basis-[20%]">
                            Description
                        </div>
                        <div className="table-title basis-[20%]">
                            Reporter
                        </div>
                        <div className="table-title basis-[7%]">
                            Priority
                        </div>
                        <div className="table-title basis-[20%]">
                            Assignee
                        </div>
                        <div className="table-title basis-[13%]">
                            Status
                        </div>
                    </div>

                    {ticketState && ticketState.ticketList.map((ticket) => {
                        return (
                            <div key={ticket._id} className="my-[2px] flex justify-between items-center bg-blue-200
                                             hover:bg-blue-300 py-2 border-b-[1px] border-black transition-all ease-in-out">
                                <div className="table-info basis-[8%] border-r-[1px] border-black">
                                    {ticket._id.substring(0, 5) + "..."}
                                </div>
                                <div className="table-info basis-[12%] border-r-[1px] border-black">
                                    {ticket.title}
                                </div>
                                <div className="table-info basis-[20%] border-r-[1px] border-black">
                                    {ticket.description}
                                </div>
                                <div className="table-info basis-[20%] border-r-[1px] border-black">
                                    {ticket.assignee}
                                </div>
                                <div className="table-info basis-[7%] border-r-[1px] border-black">
                                    {ticket.ticketPriority}
                                </div>
                                <div className="table-info basis-[20%] border-r-[1px] border-black">
                                    {ticket.assignedTo}
                                </div>
                                <div className="table-info basis-[13%]">
                                    {ticket.status}
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </HomeLayout>
    );

}

export default Dashboard;