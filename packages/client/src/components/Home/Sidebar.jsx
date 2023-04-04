import User from "./User";
import AddModal from "./AddModal";
import { FriendContext } from "./Home";
import { useContext } from "react";
import FriendReqModal from "./FriendReqModal";

import { Typography, Stack, Tabs, Tab } from "@mui/material";

const Sidebar = ({ tabIndex, setTabIndex }) => {
    // handles tab change
    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    
    const { friendsList } = useContext(FriendContext);

    return (
        <Stack spacing={1.5} sx={{borderRight: 1, borderColor: "divider"}}>
            <Typography component="h1" variant="h2">
                All-Chat
            </Typography>
            <Stack direction="row" spacing={1} >
                <AddModal />
                <FriendReqModal />
            </Stack>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Conversations"
                value={tabIndex} 
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider '}}>
                    {friendsList.map(friend => (
                        <Tab label={<User username={friend.username} status={friend.connected === "true" ? "connected" : "disconnected"} />} key={friend.userid}/>
                    ))}
            </Tabs>
        </Stack>
    )
}

export default Sidebar;