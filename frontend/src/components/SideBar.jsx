import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import { FaBookMedical } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdChatboxes } from "react-icons/io";
import {Link} from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='w-full h-full flex flex-col justify-baseline items-center gap-5 pt-32 font-bold text-xl'>
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><FaHome /></li>
        <li><Link to='/'>Home</Link></li></ul>
        </div>
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><FaBookMedical /></li>
        <li><Link to='/Education'>Resouces/Education hub</Link></li></ul>
        </div>
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><FaLocationDot />
        </li>
        <li><Link to='/Report'>Report</Link></li></ul>
        </div>
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><FiActivity /></li>
        <li><Link to='/Activity'>Activity</Link></li></ul>
        </div>
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><FaUserDoctor />
        </li>
        <li ><Link to='/Physchologist'><p>Physchologist /</p>Therapist</Link></li></ul>
        </div>  
        <div className='w-full px-9'>
        <ul className='cursor-pointer flex gap-4 justify-start w-full items-center'>
        <li><IoMdChatboxes /></li>
        <li><Link to='/Activity'>Chat List</Link></li></ul>
        </div> 
    </div>
  )
}

export default SideBar
