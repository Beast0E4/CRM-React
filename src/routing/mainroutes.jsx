import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/login';
import Signup from "../pages/auth/signup";

function MainRoutes() {

    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
    );
}

export default MainRoutes;