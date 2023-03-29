import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocket = setFriendsList => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on("friends", friendsList => {
      setFriendsList(friendsList);
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    })

  }, [setUser, setFriendsList]);
};

export default useSocket;