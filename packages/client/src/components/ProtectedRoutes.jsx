import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const { Outlet, Navigate } = require ("react-router");

const useAuth = () => {
    const { user } = useContext(AccountContext);
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    // redirect back to login if not authenticated
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;