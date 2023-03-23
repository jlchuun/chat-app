import { FriendContext } from "./Home";
import { createContext, useContext, useState } from "react";
import User from "./User";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Typography, Button, List, Stack, Tabs, Tab } from "@mui/material";


const Sidebar = ({ value, setValue }) => {
    const { friendsList, setFriendsList } = useContext(FriendContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Stack spacing={1.5} sx={{borderRight: 1, borderColor: "divider"}}>
            <Stack direction="row" spacing={5}>
                <Typography component="h2" variant="h5">
                    Add Friend
                </Typography>
                <Button size="small" variant="contained">
                    <PersonAddAlt1Icon></PersonAddAlt1Icon>
                </Button>
            </Stack>
            <Tabs
            orientation="vertical"
            variant="scrollable"
            aria-label="Conversations"
            value={value} 
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider '}}>
                <Tab label={<User/>} />
                <Tab label={<User/>} />
                <Tab label={<User/>} />
            </Tabs>
        </Stack>
    )
}

export default Sidebar;