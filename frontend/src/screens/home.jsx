import React,{ useState, useEffect} from "react";
import { FaLeaf } from "react-icons/fa6";
import { GiHiveMind } from "react-icons/gi";  
import { MdFamilyRestroom } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Home = () => {
  
  const navigate=useNavigate()
  const [Physchologists, setPhyschologists] = useState([]);
  const [client, setClient] = useState([]);
  const [totalreport, settotalreport] = useState([]);
  const [totalChat, setTotalChat] = useState([]);

  const getstarted=()=>{
    const token=localStorage.getItem('jwt')
    if(token){
      navigate('/Education')
    }else{
      navigate('/login')
    }
  }

  useEffect(() => {
      const token=localStorage.getItem('jwt')
  
      if(!token){
        navigate('/login')
      }else{
        fetch('http://localhost:3003/usersDetails',{
          headers:{
            'Content-Type':"application/json"
          }
        }).then(res=>res.json()).then(result=>{
          setPhyschologists(result.filter(items=>{
            return (items.role!="Client" && items._id!=localStorage.getItem('jwt'))
          }))
          setClient(result.filter(items=>{
            return (items.role=="Client")
          }))
        })

       fetch('http://localhost:3003/reports/totalreports',{
        headers:{
          'Content-Type':'Application/json'
        }
       }).then(res=>res.json()).then(result=>{
        if(!result.error){
        settotalreport(result)
      }
       })

       fetch('http://localhost:3003/totalchatcout',{
        headers:{
          'Content-Type':'Application/json'
        }
       }).then(res=>res.json()).then(result=>{
        if(!result.error){
          setTotalChat(result)
      }
       })
       
      }
    }, []);




  return (
    <div className=" w-[100%] max-[640px]:text-xs flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10 mt-0" >
            <FaLeaf className='w-[30%] h-[30%] text-green-900 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)]' />
            <div> 
                <p className="max-[640px]:text-xl flex mt-1 font-bold text-6xl justify-center items-center gap-4 ">Be <p className="text-green-600">Mentally</p> Feat</p>
                <p className="max-[640px]:text-xl flex mt-3 font-bold text-6xl justify-center items-center gap-4">Be <p className="text-green-600">Menatally</p> Free</p>
                <p className="max-[640px]:text-xl flex mt-3 font-bold text-6xl justify-center items-center gap-4">Be <p className="text-green-600">Safe</p></p>
            </div> 
            <div className="flex flex-col items-center justify-center">
              <div className="max-[640px]:text-xs font-semibold text-xl mx-[10%]">
                Join our communitry and keep your free from mental diseases. Have a great life in your future</div>
              <div className="mt-5">
                <button onClick={getstarted} className="max-[640px]:text-xs font-semibold bg-green-600 p-4 text-2xl rounded-full hover:border-black hover:border-2"  >Get started</button>
              </div>
            </div>
        </div>
        <div className="w-full flex justify-around items-center mt-9">
            <div className="max-[640px]:w-[30%] bg-slate-200 shadow-green-500 shadow-lg rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <GiHiveMind className='max-[640px]:text-xs max-[640px]:w-7 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs">Practice Mindfulness and Relaxation</p>
            </div>
            <div className=" max-[640px]:w-[30%] bg-slate-200 shadow-green-500 shadow-lg rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <MdFamilyRestroom className='max-[640px]:w-7 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:10px">Stay Connected with your family and friends</p>
            </div>
            <div className="max-[640px]:w-[30%] bg-slate-200 shadow-lg shadow-green-500 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <FaBookOpen className='max-[640px]:w-7 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs ">Prioritize Sleep and Routine</p>
            </div>
        </div>
        <div className="p-10 w-full count">

        <div className="flex flex-col justify-center items-center w-full bg-gray-300 rounded-xl mt-10 p-6 max-[640px]:p-1">
          <div className="font-extrabold text-4xl max-[640px]:text-2xl">Our Impact</div>
          <div className="w-full flex justify-around max-[640px]:justify-between items-center mt-9 max-[640px]:mt-3">
            <div className="bg-slate-200 rounded-xl p-7 max-[640px]:h-[150px]  w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <HiMiniBellAlert className='max-[640px]:w-5 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs">Total report {totalreport.length}</p>
            </div>
            <div className="max-[640px]:h-[150px] bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <FaUsers className='max-[640px]:w-5 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs">Total Client {client.length}</p>
            </div>
            <div className="max-[640px]:h-[150px] bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <FaUserDoctor className='max-[640px]:w-5 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs" >total physologist {Physchologists.length}</p>
            </div>
            <div className="max-[640px]:h-[150px] bg-slate-200 rounded-xl p-7 w-[20%] h-[200px] font-bold flex flex-col justify-center items-center gap-4">
            <FaHandsHelping className='max-[640px]:w-5 w-14 h-14 drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] text-green-600 font-bold' />
              <p className="max-[640px]:text-xs" >Benefited Users {totalChat.length}</p>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Home
