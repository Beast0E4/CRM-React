import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/homelayout";
import { createTicket } from "../../Redux/Slices/TicketSlice";

function CreateTicket() {
    useTickets();

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        ticketPriority: 3,
        status: 'open',
        clientName: auth.data.clientName
    });

    function handleFormChange(e) {
        const {name, value} = e.target;
        setTicket({
            ...ticket,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!ticket.title.trim() || !ticket.description.trim()){
            toast.error(`Title and description are mandatory`);
            return;
        }
        const response = await dispatch(createTicket(ticket));
        if(response?.payload?.status === 201){
            setTicket({
                title: "",
                description: "",
                ticketPriority: 3,
                status: 'open',
                clientName: auth.data.clientName
            });
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form 
                    className="min-w-[40rem] text-center border p-20 flex-col border-blue-400 rounded-lg"
                    onSubmit={onFormSubmit}>
                    <h1 className="font-semibold text-3xl text-white flex justify-center">
                        Create New Ticket
                    </h1>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text text-white text-lg">Give the title of your issue: </span>
                        </div>
                        <input 
                            name="title"
                            value={ticket.title}
                            onChange={handleFormChange}
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full bg-white text-black" 
                            required
                        />
                    </label>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text text-white text-lg">Please describe your issue: </span>
                        </div>
                        <textarea 
                            name="description"
                            value={ticket.description}
                            onChange={handleFormChange}
                            placeholder="Type here" 
                            className=" w-full bg-white text-black resize-none p-3 rounded-md" 
                            rows="5" 
                            required
                        />
                    </label>
                    <button type="submit" className="w-full bg-blue-400 text-black font-bold my-4 p-3 rounded-lg hover:scale-105 transition-all ease-in-out">SUBMIT</button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateTicket;