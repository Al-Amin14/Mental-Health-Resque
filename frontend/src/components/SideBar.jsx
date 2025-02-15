import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import { FaBookMedical } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className=' w-full transition  max-[640px]:text-[10px] h-full flex flex-col justify-start items-start gap-4 sm:gap-5 pt-20 sm:pt-32 font-bold text-base sm:text-lg md:text-xl overflow-y-auto px-4 sm:px-8'>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><FaHome className="text-sm sm:text-base md:text-lg" /></li>
          <li><Link to='/'>Home</Link></li>
        </ul>
      </div>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><FaBookMedical className="text-sm sm:text-base md:text-lg" /></li>
          <li><Link to='/Education'>Resouces / EducationHub</Link></li>
        </ul>
      </div>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><FaLocationDot className="text-sm sm:text-base md:text-lg" /></li>
          <li><Link to='/Report'>Report</Link></li>
        </ul>
      </div>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><FiActivity className="text-sm sm:text-base md:text-lg" /></li>
          <li><Link to='/Activity'>Activity</Link></li>
        </ul>
      </div>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><FaUserDoctor className="text-sm sm:text-base md:text-lg" /></li>
          <li><Link to='/Physchologist'>Psychologist / Therapist</Link></li>
        </ul>
      </div>
      <div className='w-full'>
        <ul className='cursor-pointer flex gap-2 sm:gap-3 justify-start w-full items-center'>
          <li><IoMdChatboxes className="text-sm sm:text-base md:text-lg" /></li>
          <li ><Link to='/chat'>Chat List</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
