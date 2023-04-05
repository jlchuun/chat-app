import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocket = (friendsList, setFriendsList, setMessages, setFriendRequests) => {
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

    socket.on("messages", (messages) => {
      setMessages(messages);
    })

    socket.on("directMessage", (message) => {
      setMessages(prevMsgs => [message, ...prevMsgs]);
    })

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    })

    // get pending friend requests
    socket.on("friendRequests", (requests) => {
      setFriendRequests(requests);
    })
    // get incoming friend request
    socket.on("newFriendRequest", (user) => {
      setFriendRequests(prevReqs => [user, ...prevReqs]);
    })

    socket.on("removeFriend", (user) => {
      setFriendsList(prevFriends => prevFriends.filter(friend => friend.userid !== user.userid));
    })

    return () => {
      socket.off("connect_error");
      socket.off("directMessage");
      socket.off("messages");
      socket.off("addFriend");
      socket.off("friends");
      socket.off("friendRequest");
      socket.off("newFriendRequest");
      socket.off("removeFriend");
    };
  }, [setUser, setFriendsList, friendsList, setMessages, setFriendRequests]);
};

export default useSocket;