import User from "./User";
import AddModal from "./AddModal";
import { FriendContext } from "./Home";
import { useContext } from "react";
import FriendReqModal from "./FriendReqModal";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

import { Typography, Stack, Tabs, Tab, IconButton, Tooltip } from "@mui/material";

const Sidebar = ({ tabIndex, setTabIndex }) => {
    // handles tab change
    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    const navigate = useNavigate();
    
    const { friendsList } = useContext(FriendContext);

    const handleLogout = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        }).then(res => {
            if (!res || !res.ok || res.status >= 400) {
                return;
            }
        }).then(() => {
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <Stack spacing={1.5} sx={{borderRight: 1, borderColor: "divider"}}>
            <Typography component="h1" variant="h2">
                All-Chat
            </Typography>
            
            <Stack direction="row" spacing={1} >
                <AddModal/>
                <FriendReqModal />
                <Tooltip title="Logout">
                    <IconButton onClick={handleLogout}>
                        <LogoutIcon  />
                    </IconButton>
                </Tooltip>
                
            </Stack>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Conversations"
                value={tabIndex} 
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider '}}>
                    {friendsList.map(friend => (
                        <Tab component="a" label={<User friend={friend} status={friend.connected === "true" ? "connected" : "disconnected"} />} key={friend.userid}/>
                    ))}
            </Tabs>
        </Stack>
    )
}

export default Sidebar;