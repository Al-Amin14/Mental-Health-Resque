import React, { useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { LuLogIn } from "react-icons/lu";

const Navbar = () => {

    const [logedin, setLogedin] = useState(false);

  return (
    <div className='bg-slate-300 m-0 w-full top-0'>
    <div className='flex justify-between mx-10 py-4'>
        <div className='flex justify-center items-center gap-5'>
            <div><FiAlignJustify className='w-10 h-10' /></div>
            <div className='flex justify-center items-center gap-1'><FaLeaf className='w-14 h-14 text-green-900' /><p className='font-bold text-2xl text-green-900'> Mental Well Being</p></div>
        </div>
        <div className='flex gap-7 justify-center items-center font-bold text-2xl'>
            <div><IoNotifications /></div>
            <div>count</div>
            <div className='cursor-pointer hover:mt-2 hover:font-extrabold'>{logedin?<MdPeopleAlt />:<div className='flex justify-center items-center gap-1'><p>Login</p><LuLogIn /></div>}</div>
        </div>
    </div>
    </div>
  )
}

export default Navbar
