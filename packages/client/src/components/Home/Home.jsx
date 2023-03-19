import styles from "./Home.module.css";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
        <div className={styles.container}>
            <a href="test" className={`${styles.button}`}>Logout</a>
            <Sidebar />
            <div className={styles.chatArea}>
                <div className={styles.stickyUser}>STICKY USER</div>
                <div>CHAT AREA</div>
            </div>
        </div>
    )
}

export default Home;