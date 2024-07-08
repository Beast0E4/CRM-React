import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/login';
import Signup from "../pages/auth/signup";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home/home";
import CreateTicket from "../pages/tickets/CreateTickets";
import ListAllUsers from "../pages/users/ListAllUsers";
import AuthRoutes from "./authRoutes";

function MainRoutes() {

    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/ticket/create" element={<CreateTicket/>}/>
            <Route element={<AuthRoutes allowListedRoles={["admin"]}/>}>
                <Route path="/users" element={<ListAllUsers/>}/>
            </Route>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}

export default MainRoutes;