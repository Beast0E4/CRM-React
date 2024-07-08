function TicketDetailsModal({ ticket }) {

    return (
        <dialog id="ticket_modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-xl">{ticket.title}</h3>
            {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
            <textarea 
                name="description" 
                cols="55" 
                rows="7" 
                value={ticket.description} 
                className="resize-none p-2 my-2 bg-gray-800 text-white rounded-md"
            ></textarea>
            <h1 className="text-lg text-white">Priority:
                <details className="dropdown mx-2">
                    <summary className="btn m-1">{ticket.ticketPriority}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </details>
            </h1>
            <h1 className="text-lg text-white">Status:
                <details className="dropdown mx-4">
                    <summary className="btn m-1 uppercase">{ticket.status === "inProgress" ? "in progress" : ticket.status}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>Open</li>
                        <li>In Progress</li>
                        <li>Resolved</li>
                        <li>On Hold</li>
                        <li>Cancelled</li>
                    </ul>
                </details>
            </h1>
            <div className="modal-action">
                <button className="btn bg-blue-950 hover:bg-blue-900 transition-all ease-in-out font-bold">Update Ticket</button>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
    )
}

export default TicketDetailsModal;