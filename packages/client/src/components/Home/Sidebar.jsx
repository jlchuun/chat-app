import User from "./User";
import AddModal from "./AddModal";
import { FriendContext } from "./Home";
import { useContext } from "react";


import { Stack, Tabs, Tab } from "@mui/material";

const Sidebar = ({ value, setValue }) => {
    // handles tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const { friendsList } = useContext(FriendContext);

    return (
        <Stack spacing={1.5} sx={{borderRight: 1, borderColor: "divider"}}>
            <AddModal />
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Conversations"
                value={value} 
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider '}}>
                    {friendsList.map(friend => (
                        <Tab label={<User username={friend.username} status={friend.connected === "true" ? "connected" : "disconnected"} />} key={friend}/>
                    ))}
            </Tabs>
        </Stack>
    )
}

export default Sidebar;