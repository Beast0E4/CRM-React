import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";

import useTickets from "./useTickets";

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

function useCharts() {

    const [ticketState] = useTickets();

    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [],
        inProgressTickets: [],
        resolvedTickets: [],
        openTicketsByMonth: [],
        inProgressTicketsByMonth: [],
        resolvedTicketsByMonth: []
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

    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: "Open Tickets Data",
                data: Object.values(ticketsChartData.openTicketsByMonth),
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1
            },
            {
                label: "In Progress Tickets Data",
                data: Object.values(ticketsChartData.inProgressTicketsByMonth),
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 2
            },
            {
                label: "Resolved Tickets Data",
                data: Object.values(ticketsChartData.resolvedTicketsByMonth),
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 4
            }
        ]
    };

    function processTickets() {
        const currDate = new Date();
        const tenthDayFromToday = new Date();
        tenthDayFromToday.setDate(currDate.getDate() - 10);
        if(ticketState.ticketList.length > 0) {
            let openTicketData = {};
            let inProgressTicketData = {};
            let resolvedTicketData = {};
            let openTicketsByMonth = {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0};
            let inProgressTicketsByMonth = {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0};
            let resolvedTicketsByMonth = {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0};
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
                const month = ticketDate.toLocaleString('default', { month: 'long' });
                if(ticket.status === 'open' && ticketDate >= tenthDayFromToday) 
                    openTicketData[date] = openTicketData[date] + 1;
                if(ticket.status === 'inProgress' && ticketDate >= tenthDayFromToday) 
                    inProgressTicketData[date] = inProgressTicketData[date] + 1;
                if(ticket.status === 'resolved' && ticketDate >= tenthDayFromToday) 
                    resolvedTicketData[date] = resolvedTicketData[date] + 1;
                if(ticket.status == 'open') openTicketsByMonth[month] ++;
                if(ticket.status == 'inProgress') inProgressTicketsByMonth[month] ++;
                if(ticket.status == 'resolved') resolvedTicketsByMonth[month] ++;
            });
            setTicketsChartData({
                openTickets: openTicketData,
                inProgressTickets: inProgressTicketData,
                resolvedTickets: resolvedTicketData,
                openTicketsByMonth: openTicketsByMonth,
                resolvedTicketsByMonth: resolvedTicketsByMonth,
                inProgressTicketsByMonth: inProgressTicketsByMonth
            });
        }
    }

    useEffect(() => {
        processTickets();        
    }, [ticketState.ticketList]);

    return [pieChartData, lineChartData, barChartData];
}

export default useCharts;