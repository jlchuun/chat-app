import { createContext, useState } from "react";
import Sidebar from "./Sidebar";
import ChatTab from "./Chat/ChatTab";

import { Grid } from "@mui/material";
import useSocket from "./useSocket";

export const FriendContext = createContext();
export const SocketContext = createContext();
export const MessageContext = createContext();



const Home = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [messages, setMessages] = useState([
      {
        to: "another",
        from: "current",
        body: "Dummy text data"
      },
      {
        to: "current",
        from: "another",
        body: "Dummy text data 2"
      },
      {
        to: "another",
        from: "current",
        body: "Dummy text data"
      }
    ]);
    const [tabIndex, setTabIndex] = useState(0);
    useSocket(friendsList, setFriendsList);
    

    return (
      <FriendContext.Provider value={{ friendsList, setFriendsList }}>
          <Grid container columns={10} sx ={{ height: "100dvh"}}>
            <Grid item xs={3}>
              <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex}/>
            </Grid>
            <Grid item xs={7}>
              <MessageContext.Provider value={{ messages, setMessages }}>
                {friendsList.map((friend, index) => (
                  <ChatTab key={friend.userid} friend={friend} tabIndex={tabIndex} index={index} />
                ))}
              </MessageContext.Provider>
            </Grid>
          </Grid>
      </FriendContext.Provider>
    )
}

export default Home;