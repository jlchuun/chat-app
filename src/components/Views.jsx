import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default Views;