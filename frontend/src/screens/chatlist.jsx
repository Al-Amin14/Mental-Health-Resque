import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatPage from '../components/chatshow'
import { loginContext } from '../contex/logincontext'
import { FaEdit } from "react-icons/fa";
import io from 'socket.io-client'



const endpoint="http://localhost:3003"
var socket,selectedChatCompare;
var value


const chatlist = () => {

    const [fullChatList, setFullChatList] = useState([]);
    const [showChatbar, setShowChatbar] = useState(false);
    const [showName, setShowName] = useState(false);
    const [updatename, setUpdatename] = useState("");
    const [chatdetailsvalue, setChatdetailsvalue] = useState([]);
    const [totalchat, setTotalchat] = useState([]);
    const [input, setInput] = useState("");
    const [socketconnected, setsocketconnected] = useState(false);

    const {chatiduser, setChatiduser,setCheckAnother}=useContext(loginContext)


    useEffect(() => {

        const token = localStorage.getItem('jwt')
        if(token){
          setCheckAnother(false)
          socket=io(endpoint)
      socket.emit("setup",localStorage.getItem('user'));
      socket.on("connection",()=>setsocketconnected(true))



            fetch('http://localhost:3003/fetchAllchat',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem('jwt')
                }
            }).then(res=>res.json()).then(result=>{
                console.log(result)
                setFullChatList(result)
            }
            )
        }else{
          navigate('/login')
        }

    }, []);

    const navigating=(id)=>{
        
        setChatiduser(id)
        setShowChatbar(true)
  
      }
   


    
    const {notification,setNotification,notifcounting,setNotifcounting}=useContext(loginContext)


    const renaming=()=>{    
        fetch('http://localhost:3003/renameGrouph',{
            methos:"PUT",
            body:JSON.stringify({
                chatid:id,
                name:updatename
            })
        }).then(res=>res.json()).then(result=>{
            setUpdatename(result.chatname)
        }
        )
    }

    const toggleing=()=>{
        if(showName){
          setShowName(false)
        }else{
            setShowName(true)
        }
    }

  

    
    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        if(token){
          if(chatiduser.length>=1){

            fetch('http://localhost:3003/chatdetails',{
              method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    chatid:chatiduser
                })
            }).then(res=>res.json()).then(result=>{
                if(!result.error){
                setChatdetailsvalue(result)
                console.log(result)
                fetch(`http://localhost:3003/${chatiduser}`,{
                
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem('jwt')
                      },

                    }).then(res=>res.json()).then(result=>{
                      if(!result.error){
                        setTotalchat(result)
                      }
                      socket.emit("join chat",chatiduser)
                    }
                  )
                }
              })
              
            }
        }

        value = chatiduser
    },[ chatiduser])

     
    
      useEffect(() => {
    
        setTotalchat(totalchat)
    
       
        socket.on("message received",(newMessageRecived)=>{
        
        if(value != newMessageRecived.chat._id  ){
            
            var iduser=newMessageRecived.chat.users.map(items=>items._id)
            iduser=JSON.stringify(iduser)
            
    
              fetch('http://localhost:3003/notifying/createNotification',{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                },
              body:JSON.stringify({
                content:newMessageRecived.message,
                chat:newMessageRecived.chat._id,
                sender:newMessageRecived.sender._id,
                tosend:iduser
              })
            }).then(res=>res.json()).then(result=>{
              if(!result.error){
                setNotifcounting(notifcounting+1)

                setNotification([newMessageRecived,...notification])
            }
             })
             
            
          }else{
            if(value === newMessageRecived.chat._id){
              setTotalchat([...totalchat,newMessageRecived])
            }
          }
        }
      )
      });
    
    
        const logoutHandle=()=>{
          if(window.confirm("Do want to log out")){
          localStorage.clear()
          navigate('/')
          setLoged(false)
        }
        }


    

    

 
    const sendMessage=()=>{

        

        console.log(value)

        fetch('http://localhost:3003/sendmessage',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                content:input,
                chatid:chatiduser
            })
        }).then(res=>res.json()).then(result=>{
           
              if(!result.error){
                setInput("")
                setTotalchat([...totalchat,result])
               
              }else{
                console.log(result)
              }
              socket.emit("new message",result)
        })
    }

    


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

      
          <div className="flex flex-col h-screen p-6 max-w-md mx-auto">
            {
              showName &&
              (<div className="flex justify-center items-center gap-3">
                <input
              type="text"
              value={updatename}
              onChange={(e) => setUpdatename(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600" onClick={()=>renaming()}> Upadate</button>
              </div>
              )
            }
            <div className="items-center gap-5 flex justify-center font-bold text-xl">{chatdetailsvalue!=null && (chatdetailsvalue.chatname=="sender"?chatdetailsvalue.users.map(items=>{if(items._id!=localStorage.getItem("user")){
      
              return items.fullname
            }}):chatdetailsvalue.chatname)}
            <div><FaEdit onClick={()=>toggleing()} /></div>
            </div>
      
            <div className="flex-1 overflow-y-auto border p-4 rounded-md bg-gray-100">
              {totalchat.map((msg, index) => (
                <div key={index} className={`p-2 my-2 rounded-md ${msg.sender._id === localStorage.getItem('user') ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
                  <span className="font-bold">{msg.sender._id=== localStorage.getItem('user')?"You":msg.sender.fullname}: </span>{msg.message}
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        

        {/* <ChatPage chatiduser={chatiduser} showChatbar={showChatbar} setShowChatbar={setShowChatbar}/> */}
    </div>) 
    }
    </div>
    </div>
  )
}

export default chatlist
