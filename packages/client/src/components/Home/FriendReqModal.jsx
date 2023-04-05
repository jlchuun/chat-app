import { Typography,
         Modal, 
         Button, 
         Box, 
         Stack, 
         List, 
         ListItem,
         ListItemText,
         IconButton,
         ButtonGroup,
         Tooltip
        } from "@mui/material";

import PeopleIcon from '@mui/icons-material/People';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { FriendReqContext } from "./Home";
import { FriendContext } from "./Home";
import socket from "../../socket";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FriendReqModal = () => {
    const [open, setOpen] = useState(false);
    const { friendRequests, setFriendRequests } = useContext(FriendReqContext);
    const { setFriendsList } = useContext(FriendContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // accept is true to add, false to deny
    const handleReq = (user, accept) =>  {
        setFriendRequests(prevMsgs => prevMsgs.filter(request => request.userid !== user.userid));
        socket.emit("addFriend", {user, accept});
        if (accept) {
            setFriendsList(prevFriends => [user, ...prevFriends]);
        }
    }

    return (
        <>
            <Tooltip title="Friend Requests">
                <Button size="small" variant="contained" onClick={handleOpen}>
                    <PeopleIcon />
                </Button>
            </Tooltip>
            
            <Modal
                open={open}
                onClose={handleClose}
            >  
                <Box sx={style}>
                    <Stack>
                        <Typography component="h2" variant="h5">
                            Friend Requests
                        </Typography>
                        {friendRequests.length > 0 ? 
                        <List>
                            {friendRequests.map(user => (
                                <ListItem
                                    key={user.userid}
                                    secondaryAction={
                                        <ButtonGroup>
                                            <IconButton onClick={() => handleReq(user, true)}>
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleReq(user, false)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </ButtonGroup>
                                        
                                    }
                                >
                                    <ListItemText primary={user.username} />
                                </ListItem>
                            ))}
                        </List> : 
                        <Typography component="h3" variant="body1">
                            No friend requests.    
                        </Typography>}
                    </Stack>
                </Box>

            </Modal>
        </>
        
    );
}

export default FriendReqModal;