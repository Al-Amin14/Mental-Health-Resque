import {SocketContext} from '../contex/circuit_context'
import { loginContext } from '../contex/logincontext'
import { useContext, useEffect } from 'react'

const useListenmessage=()=>{
    const {socket}=useContext(SocketContext)
    const {totalchat,setTotalchat}=useContext(loginContext)

    useEffect(() => {
        socket?.on("newMessage",(newMessage)=>{
            setTotalchat([...totalchat,newMessage])
        })
        return ()=>socket?.off("newMessage")
    }, [socket,setTotalchat,totalchat]);
}

export default useListenmessage