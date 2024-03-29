import { useNavigate } from "react-router-dom";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ 
        loggedIn: null,
        token: localStorage.getItem("token")
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            credentials: "include",
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        })
        .catch(err => {
            setUser({ loggedIn: false });
            return;
        })
        .then(res => {
            if (!res || !res.ok) {
                setUser({ loggedIn: false });
                return;
            }
            return res.json()
        })
        .then(data => {
            if (!data) {
                setUser({ loggedIn: false })
                return;
            }
            setUser({...data});
            navigate("/home");
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext;