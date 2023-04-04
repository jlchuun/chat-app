import socket from "../../socket";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { friendSchema } from "@chat-app/common";
import { useContext, useState } from "react";
import { FriendContext } from "./Home";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { Box, TextField, Stack, Alert, Typography, Button, Modal } from "@mui/material";

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

const AddModal = () => {
    const { setFriendsList } = useContext(FriendContext);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () =>  {
        reset();
        setError(null);
        setOpen(false);
    }
    const addFriend = (values) => {
        reset();
        socket.emit("addFriend", values.username, 
        ({ status, message, newFriend }) => {
            console.log(status, message, newFriend);
            if (status === "success") {
                setFriendsList(friends => [newFriend, ...friends]);
                handleClose();
                return;
            }
            setError(message);
        });
    };

    const {
        control,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm({
        resolver: yupResolver(friendSchema),
        defaultValues: {
            username: ""
        }
    });
    return (
        <>
            <Button size="small" variant="contained" onClick={handleOpen}>
                <PersonAddAlt1Icon></PersonAddAlt1Icon>
            </Button>
            <Modal
                open={open}
                onClose={handleClose} >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(addFriend)}>
                            <Stack spacing={3}>
                                {error !== null ? <Alert severity="error">{error}</Alert> : ""}
                                <Typography component="h2" variant="h5">
                                    Add Friend
                                </Typography>
                                <Controller 
                                    name="username"
                                    control={control}
                                    render={({ field: { ref, ...field }, fieldState: { error }}) => (
                                        <TextField 
                                            {...field}
                                            variant="standard" 
                                            label="Enter username here"
                                            inputRef={ref}
                                            id="username"
                                            autoFocus
                                            autoComplete="off"
                                            error={error !== undefined}
                                            helperText={error ? errors.username.message : ""} 
                                        />
                                    )}
                                
                                />
                                <Button type="submit" variant="contained">Send friend request</Button>
                            </Stack> 
                        </form> 
                    </Box>
            </Modal>
        </>
    )
}

export default AddModal;