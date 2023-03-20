import styles from "./Home.module.css";
import { FriendContext } from "./Home";
import { useContext } from "react";

const Sidebar = () => {
    const { friendsList, setFriendsList } = useContext(FriendContext);
    return (
        <aside className={styles.sidebar}>
            <form className={styles.addFriend}>
                <label for="username">Add Friend</label>
                <input type="text" placeholder="Enter username" required></input>
                <button type="submit">Send Friend Request</button>
            </form>
            <ul>
                {friendsList}
            </ul>
        </aside>
    )
}

export default Sidebar;