import { Typography, Badge, ListItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

const User = ({ username, status }) => {
    return (
        <ListItem>
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
    
            <Typography component="p" variant="body1" textTransform="none">
                {username}
            </Typography>
        </ListItem>
    )
}

export default User;