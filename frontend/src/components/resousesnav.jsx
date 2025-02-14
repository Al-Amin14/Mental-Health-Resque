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
        <div className="mx-auto flex justify-around items-center gap-4">
          <button onClick={navigatinghome} className="bg-green-500 font-bold text-xl text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl">Resourses vlog</button>
          <button onClick={navigatingposting} className="bg-green-500 font-bold text-xl text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl ">Create post</button>
          <button onClick={myreactposts} className="bg-green-500 font-bold text-xl text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl ">Like posts</button>
        </div>
      </nav>
    );
  }

export default Resourses
  