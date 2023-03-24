import { useContext, useEffect } from "react";


const useSocket = () => {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:4000");

    }, [])
}

export default useSocket;