import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateTicket } from "../Redux/Slices/TicketSlice";

function TicketDetailsModal({ ticket }) {

    const [currentTicket, setCurrentTicket] = useState(ticket);
    const dispatch = useDispatch();

    function handleTicketChange(e) {
        const { name, value } = e.target;
        setCurrentTicket({
            ...currentTicket,
            [name] : value
        });
    }

    async function handleSubmit() {
        const response = await dispatch(updateTicket(currentTicket));
        console.log(response);
    }

    return (
        <dialog id="ticket_modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-xl">{currentTicket.title}</h3>
            <textarea 
                name="description" 
                cols="55" 
                rows="7" 
                value={currentTicket.description} 
                className="resize-none p-2 my-2 bg-gray-800 text-white rounded-md border-0"
                onChange={handleTicketChange}
            ></textarea>
            <h1 className="text-lg text-white my-2">Priority:
                <select name="ticketPriority" onChange={handleTicketChange} className="select w-full max-w-xs ml-2 border-[1px] border-white">
                    <option disabled selected>{currentTicket.ticketPriority}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </h1>
            <h1 className="text-lg text-white my-2">Status:
                <select name="status" onChange={handleTicketChange} className="select w-full max-w-xs ml-2 border-[1px] border-white">
                    <option disabled selected>{currentTicket.status}</option>
                    <option>open</option>
                    <option>inProgress</option>
                    <option>resolved</option>
                    <option>onHold</option>
                    <option>cancelled</option>
                </select>
            </h1>
            <div className="modal-action">
                <button onClick={handleSubmit} className="btn bg-blue-950 hover:bg-blue-900 transition-all ease-in-out font-bold">Update Ticket</button>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
    );
}

export default TicketDetailsModal;