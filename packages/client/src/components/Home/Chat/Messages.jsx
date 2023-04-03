import Message from "./Message";
import { Paper } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { MessageContext } from "../Home";

const Messages = ({ friend }) => {
    const { messages } = useContext(MessageContext);
    const bottom = useRef(null);

    useEffect(() => {
        bottom.current?.scrollIntoView();
    }, []);

    return (
        <Paper sx={{
            display: "flex",
            flexDirection: "column-reverse",
            overflowY: "scroll",
            height: "100%"
        }}>
            <div ref={bottom}></div>
            {messages.filter(msg => msg.to === friend.username || msg.from === friend.username)
                     .map((msg, index) => (
                        <Message key={`${msg}.${index}`} msg={msg} friend={friend} />
            ))}
        </Paper>
    );
}

export default Messages;