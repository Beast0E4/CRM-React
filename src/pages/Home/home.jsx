import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
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
            <Card>
                <FaPencilAlt className="inline mr-2"/>
            </Card>
        </HomeLayout>
    );
}

export default Home;