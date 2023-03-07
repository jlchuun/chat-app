import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default Views;