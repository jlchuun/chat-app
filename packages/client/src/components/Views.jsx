import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { AccountContext } from "./AccountContext";
import { useContext } from "react";

const Views = () => {
    const { user } = useContext(AccountContext);
    return user.loggedIn === null ? (
        ""
    ) : (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default Views;