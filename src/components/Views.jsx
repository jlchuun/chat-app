import { Routes, Route } from "react-router-dom";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
}