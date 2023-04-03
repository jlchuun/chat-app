import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { messageSchema } from "@chat-app/common";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const ChatField = () => {
    const {
        control,
        reset,
        handleSubmit
    } = useForm({
        defaultValues: {
            msgInput: ""
        },
        resolver: yupResolver(messageSchema)
    });

    const sendMsg = (values) => {
        reset();
        console.log("Msg: ", values);
    }

    return (
        <form onSubmit={handleSubmit(sendMsg)}>
            <Controller 
                name="msgInput"
                control={control}
                render={({ field:  { ref, ...field }}) => (
                    <TextField 
                        {...field}
                        maxRows={4}
                        inputRef={ref}
                        name="msgInput"
                        id="msgInput"
                        label="Enter message"
                        InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="send" size="medium" type="submit">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                        }}
                        sx={{ width: "95%", m: "1rem" }} 
                    />)}
            />
        </form>
    );
}

export default ChatField;