import styles from "./Home.module.css";

const  User = () => {
    return (
        <li className={styles.userItem}>
            <div className={styles.itemBox}>
                <div className={styles.itemLeft}>
                    <img src="https://i.imgur.com/Ctwf8HA.png" alt="prof" />
                    <div className={styles.info}>
                        <p>Joshua</p>
                        <p><i>last seen</i></p>
                    </div>
                </div>
                
                <div className={styles.status}>
                    Online
                </div>
            </div>
        </li>
    )
}

export default User;