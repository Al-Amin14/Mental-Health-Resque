import React from 'react'
import ChatNavbar from './chatnav'
import Chathome from '../components/chathome'

const chat = () => {
  return (
    <div>
      <div className='w-full h-[40%] bg-black'>

      <ChatNavbar/>
      </div>

      <div className='h-screen'>
        <Chathome/>
      </div>

      
    </div>
  )
}

export default chat
