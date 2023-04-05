import { 
        Typography, 
        Badge, 
        ListItem, 
        IconButton, 
        Dialog,
        DialogTitle,
        DialogActions,
        Button
      } from "@mui/material";
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

import { useContext, useState } from "react";
import { FriendContext } from "./Home";
import socket from "../../socket";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const statusColors = {
    connected: "#44b700",
    disconnected: "#DC143C"
};

const User = ({ friend, status }) => {
    // for delete friend dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { setFriendsList } = useContext(FriendContext);

    const removeFriend = () => {
          setFriendsList(prevFriends => prevFriends.filter(user => user.userid !== friend.userid));
          socket.emit("removeFriend", friend);
    }

    return (
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton onClick={handleOpen} >
              <CloseIcon />
            </IconButton>
          }  
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx ={{ 
                    '& .MuiBadge-badge': {
                        color: statusColors[status],
                        backgroundColor: statusColors[status]
                    }
                }}
            >
                <AccountCircleIcon fontSize="inherit" sx={{fontSize: "3rem"}}></AccountCircleIcon>
            </StyledBadge>
            <Typography component="p" variant="body1" textTransform="none" m={1}>
                {friend.username}
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  {"Remove friend from messages?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={removeFriend} >Confirm</Button>
                  <Button onClick={handleClose} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )
}

export default User;