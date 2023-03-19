import ToggleTheme from "../ToggleTheme";
import styles from "./Home.module.css";
import Sidebar from "./Sidebar";
import User from "./User";

const Home = () => {
    return (
        <div className={styles.container}>
            <ToggleTheme />
            <a href="test" className={`${styles.button}`}>Logout</a>
            <Sidebar />
            <div className={styles.chatArea}>
                <div className={styles.stickyUser}><User /></div>
                <div>CHAT AREA</div>
            </div>
        </div>
    )
}

export default Home;