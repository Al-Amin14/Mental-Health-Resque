import React, { useContext, useEffect, useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { loginContext } from '../contex/logincontext';
// import { Link } from 'react-router-dom';


const endpoint="http://localhost:3003"
var socket,selectedChatCompare;


const Navbar = ({toggleing}) => {

  const {loged,setLoged,notification,setNotification,totalchat,setTotalchat,notifcounting,setNotifcounting} = useContext(loginContext);

  
  const [noticount, setNoticount] = useState([])


    const navigate=useNavigate()
    const navigating=()=>{
      navigate('/login')
    }



    
    useEffect(() => {
      const token=localStorage.getItem('jwt')
      if(token){
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
