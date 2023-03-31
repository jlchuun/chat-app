import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocket = (friendsList, setFriendsList) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();

    socket.on("friends", friendsList => {
      setFriendsList(friendsList);
    });

    socket.on("connected", (status, username) => {
      const updatedFriendsList = [...friendsList].map(friend => {
        if (username === friend.username) {
          friend = {...friend, connected: status.toString()};
        }
        return friend;
      });
      setFriendsList(updatedFriendsList);

    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    })
    return () => {
      socket.off("connect_error");
    };
  }, [setUser, setFriendsList, friendsList]);
};

export default useSocket;