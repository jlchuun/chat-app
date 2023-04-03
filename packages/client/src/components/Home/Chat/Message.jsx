import { Box, Typography } from "@mui/material"

const Message = ({ msg, friend}) => {
    return (
        <Box sx={{
                px: "1.5rem",
                py: "1rem",
                m: ".2rem",
                borderRadius: "10px",
                maxWidth: "50%",
                alignSelf: "flex-start",
                backgroundColor: "#121212",
                ...(msg.to === friend.username && {
                    alignSelf: "flex-end",
                    backgroundColor: "#3f51b5"
                }),
            }}>
            <Typography variant="body1">
                {msg.body}
            </Typography>
        </Box>

    );
}

export default Message;