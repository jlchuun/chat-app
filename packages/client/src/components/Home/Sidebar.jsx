import { FriendContext } from "./Home";
import { useContext, useState } from "react";
import User from "./User";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { friendSchema } from "@chat-app/common";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Typography, Button, Modal, Stack, Tabs, Tab, TextField, Box } from "@mui/material";


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

const Sidebar = ({ value, setValue }) => {
    const { friendsList, setFriendsList } = useContext(FriendContext);
    const [open, setOpen] = useState(false);

    // open/close modal
    const handleOpen = () => setOpen(true);
    const handleClose = () =>  {
        reset();
        setOpen(false);
    }
    // handles tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // form handler
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
        <Stack spacing={1.5} sx={{borderRight: 1, borderColor: "divider"}}>
            <Stack direction="row" spacing={5} sx={{m: '1rem'}}>
                <Typography component="h2" variant="h5">
                    Add Friend
                </Typography>
                <Button size="small" variant="contained" onClick={handleOpen}>
                    <PersonAddAlt1Icon></PersonAddAlt1Icon>
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose} >
                        <Box sx={style}>
                            <form onSubmit={handleSubmit((values) => {
                                console.log(values);
                                reset();
                                handleClose();
                            })}>
                               <Stack spacing={3}>
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
            </Stack>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Conversations"
                value={value} 
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider '}}>
                    {friendsList.map(friend => (
                        <Tab label={<User username={friend.username} />} />
                    ))}
            </Tabs>
        </Stack>
    )
}

export default Sidebar;