import React from 'react'
import { FaLeaf } from "react-icons/fa6";
import { GiHiveMind } from "react-icons/gi";  
import { MdFamilyRestroom } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";

const Activity = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-10 mt-28" >
                <FaLeaf className='w-[30%] h-[30%] text-green-900 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)]' />
                <div>
                    <p className="flex mt-3 font-bold text-6xl justify-center items-center gap-4 ">Be <p className="text-green-600">Mentally</p> Feat</p>
                    <p className="flex mt-3 font-bold text-6xl justify-center items-center gap-4">Be <p className="text-green-600">Menatally</p> Free</p>
                    <p className="flex mt-3 font-bold text-6xl justify-center items-center gap-4">Be <p className="text-green-600">Safe</p></p>
                </div> 
                <div className="flex flex-col items-center justify-center">
                  <div className="font-semibold text-xl">
                    Join our communitry and keep your free from mental diseases. Have a great life in your future</div>
                  <div className="mt-5">
                    <button className="font-semibold bg-green-600 p-4 text-2xl rounded-full hover:border-black hover:border-2"  >Get started</button>
                  </div>
                </div>
            </div>
            <div className="w-full flex justify-around items-center mt-9">
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <GiHiveMind className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p>Practice Mindfulness and Relaxation</p>
                </div>
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <MdFamilyRestroom className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p>Stay Connected with your family and friends</p>
                </div>
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <FaBookOpen className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p >Prioritize Sleep and Routine</p>
                </div>
            </div>
            <div className="p-10 w-full count">
    
            <div className="flex flex-col justify-center items-center w-full bg-gray-300 rounded-xl mt-10 p-6">
              <div className="font-extrabold text-4xl">Our Impact</div>
              <div className="w-full flex justify-around items-center mt-9">
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <HiMiniBellAlert className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p>Total report count</p>
                </div>
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <FaUsers className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p>Total Uses count</p>
                </div>
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <FaUserDoctor className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p>total physologist count</p>
                </div>
                <div className="bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
                <FaHandsHelping className='w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
                  <p >Benefited count</p>
                </div>
            </div>
            </div>
            </div>
        </div>
  )
}

export default Activity
