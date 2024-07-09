import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTicket, getAllCreatedTicketsForTheUser, getAllTicketsForTheUser, resetTicketList } from "../Redux/Slices/TicketSlice";

function useTickets () {

    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    async function loadTickets(){
        console.log(searchParams);
        if(ticketState.downloadedTickets.length === 0){
            if(authState.role === 'customer'){
                await dispatch(getAllCreatedTicketsForTheUser(searchParams.get("status")));
            } else {
                await dispatch(getAllTicketsForTheUser(searchParams.get("status")));
            }

        }
        if(searchParams.get("status")){
            dispatch(filterTicket({status: searchParams.get("status")}));
        } else {
            dispatch(resetTicketList());
        }
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token, searchParams.get("status")]);

    return [ticketState];
}

export default useTickets;