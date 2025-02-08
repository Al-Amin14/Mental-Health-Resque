import React, { useContext, useState } from 'react'
import ChatNavbar from './chatnav'
import Chathome from '../components/chathome'
import Chatlist from './chatlist'
import { loginContext } from '../contex/logincontext'

const chat = () => {
  
  const {tochatlist,setTochatlist}=useContext(loginContext)
  const [chatlist, setChatlist] = useState(false);

  return (
    <div>
      <div className='w-full h-[40%] bg-black'>

      <ChatNavbar chatlist={chatlist} setChatlist={setChatlist}  />
      </div>

      { tochatlist!=true &&
        <div className='h-screen'>
        <Chathome setChatlist={setChatlist}/>
      </div>}
      
      { tochatlist &&
        <div >
          <Chatlist Chatlist={Chatlist}  setChatlist={setChatlist}/>
      </div>}

      
    </div>
  )
}

export default chat
