import styles from "./Home.module.css";
import User from "./User";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
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