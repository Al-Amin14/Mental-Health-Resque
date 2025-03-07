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


const endpoint="http://localhost:3003"
var selectedChatCompare;

var checking;
var counting=0;
var listNotify=[]


const Navbar = ({toggleing,socket}) => {

  const {reportNotify,setReportNotify,ioresult, setIoresult,setCheckAnother,checkAnother,loged,setLoged,notification,setNotification,totalchat,setTotalchat,notifcounting,setNotifcounting} = useContext(loginContext);

  const [noticount, setNoticount] = useState([])



    const navigate=useNavigate()
    const navigating=()=>{
      navigate('/login')
    }

    const navigating_notifications=()=>{
      counting=0;
      navigate('/notifications')
    }
      useEffect(() => {
      const token=localStorage.getItem('jwt')
      const token2=localStorage.getItem('user')
      if(token){
      // socket.emit("setup",token2);
      // socket.on("connection",()=>setsocketconnected(true))

        fetch('http://localhost:3003/notifying/allnotification',{
          headers:{
            'Content-Type':"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          }
        }).then(res=>res.json()).then(result=>{
          setNoticount(result)
        })
      }

    }, [loged]);



    useEffect(() => {
      checking=checkAnother;
      const token=localStorage.getItem('jwt')
      if(token){
        fetch('http://localhost:3003/notifying/allnotification',{
          headers:{
            'Content-Type':"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          }
        }).then(res=>res.json()).then(result=>{
          console.log(result)
          result.map(items=>{
            if(items.notify==false){
              console.log(items._id)
              if (!listNotify.includes(items._id)) {
                counting=counting+1

                listNotify.push(items._id)
              }
            }
          })
        })
      }
    }, []);


    

  // useEffect(()=>{
  //   checking=checkAnother
  //   console.log("________+++++...........")
  //   console.log(notifcounting)
  // },[ioresult])
 

  useEffect(() => {
    setTotalchat(totalchat)

    checking=checkAnother;

    const token=localStorage.getItem('jwt')

      if(token){
        
        socket?.on("message received",(newMessageRecived)=>{
          console.log(checking+" checking c")
          
          if(checking){
            
            setNotifcounting(notifcounting+1)
            console.log("Kam koray na ka _______Not working.....___________"+notifcounting)
        notifyfunc(newMessageRecived)
        
        }
      }
    )
  }
});

  const notifyfunc= async (newMessageRecived)=>{
  
    var iduser=newMessageRecived.chat.users.map(items=>items._id)
    iduser=JSON.stringify(iduser)

    await fetch('http://localhost:3003/notifying/createNotification',{
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

      console.log("Logged in............")
        fetch('http://localhost:3003/notifying/updateItnotify',{
          method:"PUT",
          headers:{
            'Content-Type':"application/json",
          },
          body:JSON.stringify({
            _id:result._id
          })
        }).then(res=>res.json()).then(result=>{
          console.log(result)
        })
        
    })

  }



 
    const logoutHandle=()=>{
      if(window.confirm("Do want to log out")){
      localStorage.clear()
      navigate('/')
      setLoged(false)
    }
    }

    useEffect(() => {
      checking=checkAnother
    }, [checkAnother]);

  return (
    <div className='bg-slate-300 m-0 w-[100vw] top-0 '>
    <div className='flex justify-between mx-[5%] max-[640px]:p-1 py-4 '>
        <div className='flex justify-center items-center gap-5'>
            <div><FiAlignJustify onClick={()=>toggleing()} className='w-10 h-10 max-[640px]:w-5' /></div>
            <div className='flex justify-center items-center gap-1'><FaLeaf className='max-[640px]:w-7 w-14 h-14 text-green-900' /><p className='max-[640px]:text-[8px] font-bold text-2xl text-green-900'> Mental Well Being</p></div>
        </div>
        <div className='flex gap-7 justify-center items-center font-bold text-2xl'>
        <div onClick={()=>{setReportNotify(0); navigate('/allreport')}} className='flex justify-center items-center cursor-pointer'><MdReport className="max-[640px]:text-xl"/>
            
            <div className="max-[640px]:text-xs">{reportNotify}</div>
            </div>
            <div onClick={()=>{counting=0; navigate('/notifications')}} className='flex justify-center items-center cursor-pointer'><RiMessage3Fill className="max-[640px]:text-xl"/>
            
            <div className="max-[640px]:text-xs">{counting+notifcounting}</div>
            </div>
            
            <div className='cursor-pointer hover:mt-2 hover:font-extrabold'>{loged?(<div onClick={logoutHandle} className='flex justify-center items-center gap-2'><IoLogOut /> <p className='max-[640px]:text-xs text-xl'>LogOut</p> </div>) :<div onClick={()=>navigating()} className='max-[640px]:text-xs flex justify-center items-center gap-1'><p className="max-[640px]:text-xs" >Login</p><LuLogIn className="max-[640px]:text-xs" /></div>}</div>
        </div>
    </div>
    </div>
  )
}

export default Navbar