import { createContext, useState } from "react";
import ToggleTheme from "../ToggleTheme";
import styles from "./Home.module.css";
import Sidebar from "./Sidebar";
import User from "./User";

export const FriendContext = createContext();

const Home = () => {
    const [friendsList, setFriendsList] = useState([<User />, <User />, <User/>]);

    return (
        <FriendContext.Provider value={{ friendsList, setFriendsList }}>
            <div className={styles.container}>
                <a href="test" className={`${styles.button}`}>Logout</a>
                <ToggleTheme />
                <Sidebar />
                <div className={styles.chatArea}>
                    <div className={styles.stickyUser}><User /></div>
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}>Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div> 
                    <div className={`${styles.chatMsg} ${styles.receiver}`}>
                        <p className={styles.msgContent}>Content asdf asd fasdf asdf asdf asdfasdfas dfasdf asd asdfasd fasd fasd fasdf asd fas dfas dfas dfasdf ad</p>
                    </div>
                    <div className={`${styles.chatMsg} ${styles.sender}`}>
                        <p className={styles.msgContent}> testing Contasdf aasdasdfasdfasdfasdfasdfasdfsadf asdfasdfasdfasdfasdfasdfasdf asdfasd fasd fasdf asdfasdfasdfsadfd</p>
                    </div>
                    <div className={styles.input}>
                        <textarea type="text" placeholder="Enter your message" />
                    </div>
                </div>
            </div>
        </FriendContext.Provider>
    )
}

export default Home;