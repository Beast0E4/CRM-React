import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosinstance";

const initialState = {
    downloadedTickets: [],
    ticketList: [],
    ticketDistribution: {
        open: 0,
        inProgress: 0,
        onHold: 0,
        cancelled: 0,
        resolved: 0
    }
};

export const getAllTicketsForTheUser = createAsyncThunk('tickets/getAllTicketsForTheUser', async () => {
    try {
        const response = axiosInstance.get('getMyAssignedTickets', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully loaded all the tickets',
            loading: 'Fetching tickets belonging to you',
            error: 'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const getAllCreatedTicketsForTheUser = createAsyncThunk('tickets/getAllCreatedTicketsForTheUser', async () => {
    try {
        const response = axiosInstance.get('getMyCreatedTickets', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully loaded all the tickets',
            loading: 'Fetching tickets belonging to you',
            error: 'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticket) => {
    try {
        const response = axiosInstance.patch(`ticket/${ticket._id}`, ticket, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully update the ticket',
            loading: 'Updating the ticket...',
            error: 'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const createTicket = createAsyncThunk('tickets/createTicket', async (ticket) => {
    try {
        const response = axiosInstance.post(`ticket`, ticket, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully created the ticket',
            loading: 'Creating the ticket...',
            error: 'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

const TicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        filterTicket: (state, action) => {
            let status = action.payload.status.toLowerCase();
            if(status === "in progress") status = "inProgress";
            if(status === "on hold") status = "onHold";
            state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status === status);
        },
        resetTicketList: (state) => {
            state.ticketList = state.downloadedTickets; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllTicketsForTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.downloadedTickets = action?.payload?.data?.result;
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                onHold: 0,
                cancelled: 0,
                resolved: 0
            };
            tickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] += 1;
            });
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            console.log(action.payload);
            const updatedTicket = action.payload.data.result;
            state.ticketList = state.ticketList.map((ticket) => {
                if(ticket._id === updatedTicket._id) return updatedTicket;
                return ticket;
            });
            state.downloadedTickets = state.downloadedTickets.map((ticket) => {
                if(ticket._id === updatedTicket._id) return updatedTicket;
                return ticket;
            });
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                onHold: 0,
                cancelled: 0,
                resolved: 0
            };
            state.downloadedTickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] += 1;
            });
        })
        .addCase(createTicket.fulfilled, (state, action) => {
            console.log(action.payload.data);
            if(action?.payload?.data === undefined) return;
            const newTicket = action.payload.data;
            state.downloadedTickets.push(newTicket); 
            state.ticketList = state.downloadedTickets;
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                onHold: 0,
                cancelled: 0,
                resolved: 0
            };
            state.downloadedTickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] += 1;
            });
        })
        .addCase(getAllCreatedTicketsForTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.downloadedTickets = action?.payload?.data?.result;
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                onHold: 0,
                cancelled: 0,
                resolved: 0
            };
            tickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] += 1;
            });
        })
    }
});

export const { filterTicket, resetTicketList } = TicketSlice.actions;

export default TicketSlice.reducer;