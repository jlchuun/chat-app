import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import ProtectedRoutes from "./ProtectedRoutes";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<h1>Welcome home</h1>} />
            </Route>
        </Routes>
    );
}

export default Views;