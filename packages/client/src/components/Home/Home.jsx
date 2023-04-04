import { createContext, useState } from "react";
import Sidebar from "./Sidebar";
import ChatTab from "./Chat/ChatTab";

import { Grid, Typography } from "@mui/material";
import useSocket from "./useSocket";

export const FriendContext = createContext();
export const SocketContext = createContext();
export const MessageContext = createContext();
export const FriendReqContext = createContext();

const Home = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([
      {username: "testing", userid: "testtest", connected: "true"}
    ]);
    const [messages, setMessages] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    useSocket(friendsList, setFriendsList, setMessages, setFriendRequests);
    

    return (
      <FriendContext.Provider value={{ friendsList, setFriendsList, setMessages }}>
          <Grid container columns={10} sx ={{ height: "100dvh"}}>
            <FriendReqContext.Provider value={{ friendRequests, setFriendRequests }}>
              <Grid item xs={3}>
                <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex}/>
              </Grid>
            </FriendReqContext.Provider>
            <Grid item xs={7}>
              <MessageContext.Provider value={{ messages, setMessages }}>
                {friendsList.length > 0 ? friendsList.map((friend, index) => (
                  <ChatTab key={friend.userid} friend={friend} tabIndex={tabIndex} index={index} />
                )) : 
                <Typography variant="h4" component="h1" textAlign="center" sx={{ m: 4}}>
                    You have no friends. Add friends to chat.
                </Typography>}
              </MessageContext.Provider>
            </Grid>
          </Grid>
      </FriendContext.Provider>
    )
}

export default Home;