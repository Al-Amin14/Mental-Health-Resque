import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { loginContext } from "../contex/logincontext";

const Resourses=()=>{
    const navigate=useNavigate()
    const {vlogshome,setVlogshome,vlogpost,setVlogpost,myposts,setMyposts}=useContext(loginContext)

    const myreactposts=()=>{
    setVlogshome(false)
    setVlogpost(false)
    setMyposts(true)
    }
    
    const navigatinghome=()=>{
      setVlogshome(true)
      setVlogpost(false)
      setMyposts(false)
    }


    const  navigatingposting=()=>{
      setVlogshome(false)
      setVlogpost(true)
      setMyposts(false)
    }

    return (

      <nav className="bg-green-900 p-4 text-white shadow-lg w-full h-auto">
  <div className="mx-auto flex flex-nowrap justify-center items-center gap-2 overflow-x-auto">
    <button 
      onClick={navigatinghome} 
      className="bg-green-500 font-bold text-sm md:text-base text-white px-3 md:px-4 py-1 md:py-2 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">
      Resources Vlog
    </button>
    <button 
      onClick={navigatingposting} 
      className="bg-green-500 font-bold text-sm md:text-base text-white px-3 md:px-4 py-1 md:py-2 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">
      Create Post
    </button>
    <button 
      onClick={myreactposts} 
      className="bg-green-500 font-bold text-sm md:text-base text-white px-3 md:px-4 py-1 md:py-2 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">
      Like Posts
    </button>
  </div>
</nav>
    );
  }

export default Resourses
  