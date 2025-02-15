import React, { useContext, useEffect, useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";
import { MdReport } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { loginContext } from '../contex/logincontext';
// import { Link } from 'react-router-dom';
import io from 'socket.io-client'



const endpoint="http://localhost:3003"
var socket,selectedChatCompare;

var checking;


const Navbar = ({toggleing}) => {

  const {setCheckAnother,checkAnother,loged,setLoged,notification,setNotification,totalchat,setTotalchat,notifcounting,setNotifcounting} = useContext(loginContext);

  
  const [noticount, setNoticount] = useState([])


    const navigate=useNavigate()
    const navigating=()=>{
      navigate('/login')
    }
      useEffect(() => {
      const token=localStorage.getItem('jwt')
      if(token){
        socket=io(endpoint)
      socket.emit("setup",localStorage.getItem('user'));
      socket.on("connection",()=>setsocketconnected(true))
        setLoged(true)
        setLoged(false)
        fetch('http://localhost:3003/notifying/allnotification',{
          headers:{
            'Content-Type':"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          }
        }).then(res=>res.json()).then(result=>{
          setNoticount(result)
        })
      }

    }, []);



    useEffect(() => {
      checking=checkAnother;
    }, []);


    
 

  useEffect(() => {
    
    setTotalchat(totalchat)

    checking=checkAnother;

   
    socket.on("message received",(newMessageRecived)=>{
      console.log(checkAnother+"----------------")
    
    if(checking){
        
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

  return (
    <div className='bg-slate-300 m-0 w-[100vw] top-0 '>
    <div className='flex justify-between mx-[5%] max-[640px]:p-1 py-4 '>
        <div className='flex justify-center items-center gap-5'>
            <div><FiAlignJustify onClick={()=>toggleing()} className='w-10 h-10 max-[640px]:w-5' /></div>
            <div className='flex justify-center items-center gap-1'><FaLeaf className='max-[640px]:w-7 w-14 h-14 text-green-900' /><p className='max-[640px]:text-[8px] font-bold text-2xl text-green-900'> Mental Well Being</p></div>
        </div>
        <div className='flex gap-7 justify-center items-center font-bold text-2xl'>
        <div onClick={()=>navigate('/notifications')} className='flex justify-center items-center cursor-pointer'><MdReport className="max-[640px]:text-xl"/>
            
            <div className="max-[640px]:text-xs">0</div>
            </div>
            <div onClick={()=>navigate('/notifications')} className='flex justify-center items-center cursor-pointer'><RiMessage3Fill className="max-[640px]:text-xl"/>
            
            <div className="max-[640px]:text-xs">{notifcounting}</div>
            </div>
            
            <div className='cursor-pointer hover:mt-2 hover:font-extrabold'>{loged?(<div onClick={logoutHandle} className='flex justify-center items-center gap-2'><IoLogOut /> <p className='max-[640px]:text-xs text-xl'>LogOut</p> </div>) :<div onClick={()=>navigating()} className='max-[640px]:text-xs flex justify-center items-center gap-1'><p className="max-[640px]:text-xs" >Login</p><LuLogIn className="max-[640px]:text-xs" /></div>}</div>
        </div>
    </div>
    </div>
  )
}

export default Navbar
