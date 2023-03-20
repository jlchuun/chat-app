import styles from "./Home.module.css";
import User from "./User";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <form className={styles.addFriend}>
                <label for="username">Add Friend</label>
                <input type="text" placeholder="Enter username" required></input>
                <button type="submit">Send Friend Request</button>
            </form>
            <ul>
                <User />
                <User />
                <User />
                <User />
            </ul>
        </aside>
    )
}

export default Sidebar;