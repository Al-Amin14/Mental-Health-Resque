import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatPage from '../components/chatshow'

const chatlist = () => {

    const [fullChatList, setFullChatList] = useState([]);
    const [showChatbar, setShowChatbar] = useState(false);
    const [chatiduser, setChatiduser] = useState("");

    useEffect(() => {

        const token = localStorage.getItem('jwt')
        if(token){
            fetch('http://localhost:3003/fetchAllchat',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem('jwt')
                }
            }).then(res=>res.json()).then(result=>{
                console.log(result)
                setFullChatList(result)
            }
            )
        }

    }, []);

    const navigating=(id)=>{
        
        setChatiduser(id)
        setShowChatbar(true)
    }
    useEffect(()=>{
      // setShowChatbar(true)
    },[chatiduser])

  return (
    <div className="w-[100%]">

    <div className="flex justify-center items-center w-full">
    <div className="p-6 max-w-md mx-auto w-[40%]">
      <h2 className="text-2xl font-bold mb-4">Chats</h2>
      <ul className="border border-gray-500 rounded-md divide-y divide-gray-400">
        {fullChatList.map((user, index) => (
          <li key={index} className="p-4 text-xl hover:bg-gray-300 cursor-pointer">
            <span onClick={()=>navigating(user._id)}  className="flex justify-between">
              <span className="font-semibold">{user.isgrouphchat? (<div> {user.chatname} (Grouph) </div>): (user.users.map(items=>{
                if(items._id!=localStorage.getItem('user')){
                    return items.fullname.toUpperCase()+" ("+items.role+") "
                }
              }) )}</span>
              {/* <span className="text-gray-500 text-sm">{user.lastMessage}</span> */}
            </span>
          </li> 
        ))}
      </ul>
    </div>
    {
      showChatbar &&
    (<div className="w-[60%]">
        <ChatPage chatiduser={chatiduser} showChatbar={showChatbar} setShowChatbar={setShowChatbar}/>
    </div>) 
    }
    </div>
    </div>
  )
}

export default chatlist
