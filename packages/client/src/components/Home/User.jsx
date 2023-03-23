import { Typography, Badge, Stack, ListItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const  User = () => {
    return (
        <ListItem>
            <Badge color="primary" variant="dot" overlap="circular">
                <AccountCircleIcon fontSize="inherit" sx={{fontSize: "3rem"}}></AccountCircleIcon>
            </Badge>
            <Typography component="p" variant="body1">
                First Last Name
            </Typography>
        </ListItem>
    )
}

export default User;