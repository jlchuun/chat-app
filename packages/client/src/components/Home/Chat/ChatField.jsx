import { Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const ChatField = () => {
    return (
        <form>
            <TextField 
                maxRows={4}
                label="Enter message"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="send" size="medium">
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                sx={{
                    width: "95%",
                    m: "1rem"
                }}
            />
        </form>
    );
}

export default ChatField;