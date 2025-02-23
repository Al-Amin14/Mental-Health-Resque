import React, { useContext, useState } from 'react'
import ChatNavbar from './chatnav'
import Chathome from '../components/chathome'
import Chatlist from './chatlist'
import { loginContext } from '../contex/logincontext'

const chat = () => {
  
  const {tochatlist,setTochatlist,setCheckAnother}=useContext(loginContext)
  const [chatlist, setChatlist] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className='w-full h-[40vh] bg-black'>
        <ChatNavbar chatlist={chatlist} setChatlist={setChatlist}  />
      </div>

      { !tochatlist &&
        <div className='flex-grow flex justify-center items-center p-4'>
          <Chathome setChatlist={setChatlist}/>
        </div>}
      
      { tochatlist &&
        <div className='flex-grow flex justify-center items-center p-4'>
          <Chatlist Chatlist={Chatlist} setChatlist={setChatlist}/>
        </div>}
    </div>
  )
}

export default chat