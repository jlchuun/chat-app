import { Typography, Badge, ListItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const  User = ({ username }) => {
    return (
        <ListItem>
            <Badge color="primary" variant="dot" overlap="circular">
                <AccountCircleIcon fontSize="inherit" sx={{fontSize: "3rem"}}></AccountCircleIcon>
            </Badge>
            <Typography component="p" variant="body1" textTransform="none">
                {username}
            </Typography>
        </ListItem>
    )
}

export default User;