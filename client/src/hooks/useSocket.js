import { useMemo } from "react" 
import { io } from "socket.io-client"

export const useSocket = () => {
    const socket = useMemo(() => io.connect('http://localhost:5000'), [])

    return socket
}