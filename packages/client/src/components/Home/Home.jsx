import { createContext, useState } from "react";
import Sidebar from "./Sidebar";
import useSocket from "./useSocket";

import PropTypes from 'prop-types';
import { Box, Typography } from "@mui/material";

export const FriendContext = createContext();
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
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
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

const Home = () => {
    useSocket();
    const [friendsList, setFriendsList] = useState([
        {username: "Josh Lee", status: "online"},
        {username: "Samuel Smith", status: "offline"}
    ]);
    const [value, setValue] = useState(0);

    return (
        <FriendContext.Provider value={{ friendsList, setFriendsList }}>
            <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" height="100dvh">
                <Box gridColumn="span 3">
                    <Sidebar value={value} setValue={setValue} />
                </Box>
                <Box gridColumn="span 7" >
                    <TabPanel value={value} index={0}>
                        Friend 1
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Friend 2
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Friend 3
                    </TabPanel>
                </Box>
            </Box>
        </FriendContext.Provider>
    )
}

export default Home;