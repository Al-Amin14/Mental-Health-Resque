import React, { useContext, useEffect, useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { loginContext } from '../contex/logincontext';

const Navbar = ({toggleing}) => {

  const {loged,setLoged} = useContext(loginContext);
    const navigate=useNavigate()

    const navigating=()=>{
      console.log("Hlleee")
      navigate('/login') 
    }
    
    useEffect(() => {
      const token=localStorage.getItem('jwt')

      if(token){
        setLoged(true)
      }else{
        setLoged(false)
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
            <div><IoNotifications className="max-[640px]:text-xl"/></div>
            <div className="max-[640px]:text-xs">count</div>
            <div className='cursor-pointer hover:mt-2 hover:font-extrabold'>{loged?(<div onClick={logoutHandle} className='flex justify-center items-center gap-2'><IoLogOut /> <p className='max-[640px]:text-xs text-xl'>LogOut</p> </div>) :<div onClick={()=>navigating()} className='max-[640px]:text-xs flex justify-center items-center gap-1'><p className="max-[640px]:text-xs" >Login</p><LuLogIn className="max-[640px]:text-xs" /></div>}</div>
        </div>
    </div>
    </div>
  )
}

export default Navbar
