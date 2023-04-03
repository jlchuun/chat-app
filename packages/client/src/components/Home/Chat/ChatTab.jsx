import { useContext } from "react";

import { Stack, Box, Typography } from "@mui/material"
import Messages from "./Messages";
import ChatField from "./ChatField";
import { FriendContext } from "../Home";

import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
const ChatTab = ({ friend, tabIndex, index }) => {
    const { friendsList } = useContext(FriendContext);

    return (
        <TabPanel key={friend.userid} value={tabIndex} index={index}>
            <Stack
                spacing={2}
                sx={{ 
                    display: "flex",
                    height: "100dvh",
                    flexDirection: "column"
                }}
            >
                <Messages key={friend.userid} friend={friend} />
                <ChatField></ChatField>
            </Stack>
        </TabPanel>
    );
}

export default ChatTab;