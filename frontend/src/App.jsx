import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';

import SideBar from './components/SideBar';
import Home from './screens/home';
import Activity from './screens/activity';
import Physchologist from './screens/physchologist';
import Education from './screens/resourceshub';
import Report from './screens/report';
import LoginPage from './screens/login';
import SignUp from './screens/signup';
import Chat from './screens/chat';
import ChatList from './screens/chatlist'
import { ToastContainer } from 'react-toastify'
import { loginContext } from './contex/logincontext';
import NotificationList from './components/notification';
import Allreports from './components/allreports'

import io from 'socket.io-client'

const endpoint="http://localhost:3003"


function App() {

  const [loged, setLoged] = useState(false);
  const [slideShow, setSlideShow] = useState(true);
  const [tochatlist, setTochatlist] = useState(false);
  const [vlogshome, setVlogshome] = useState(true);
  const [vlogpost, setVlogpost] = useState(false);
  const [myposts, setMyposts] = useState(false);
  const [notification, setNotification] = useState([]);
  const [totalchat, setTotalchat] = useState([]);
  const [notifcounting,setNotifcounting]=useState(0)
  const [chatiduser, setChatiduser] = useState("");
  const [checkAnother, setCheckAnother] = useState(true);
  const [ioresult, setIoresult] = useState("");
  const [socket, setSocket] = useState(null);
  const [report,setreport]=useState([]);
  const [reportNotify,setReportNotify]=useState(0)
 
  useEffect(() => {

    const token=localStorage.getItem('jwt')
      if(token){
        setSocket(io(endpoint))
        setLoged(true)
      }
      
    }, []);
    
  useEffect(() => {
      const token=localStorage.getItem('jwt')
    if(token){
        socket?.emit("setup",localStorage.getItem('user'));
    }
  }, [socket]);

  

  const toggleing=()=>{
    
    if(slideShow){
      setSlideShow(false)

    }else{
      setSlideShow(true)
    }
  }

  return (
    <BrowserRouter>
      <div>

        <loginContext.Provider value={{reportNotify,setReportNotify,report,setreport,socket, setSocket,ioresult, setIoresult,checkAnother,setCheckAnother,notifcounting,setNotifcounting,loged,setLoged,totalchat,setTotalchat,tochatlist,setTochatlist,vlogshome,setVlogshome,vlogpost,setVlogpost,myposts,setMyposts,notification,setNotification,chatiduser, setChatiduser}} >

        <Navbar toggleing={toggleing} socket={socket} />
        <div className='flex w-[100%] h-auto'>
          {
            slideShow &&
          (<div className='w-[20%] bg-slate-200 h-auto flex justify-center items-start'>
            <SideBar  />
          </div>)
          }
            {slideShow ? (<div className='h-auto bg-gray-100 w-[80%] '> <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/Activity" element={<Activity/>} ></Route>
              <Route path="/Education" element={<Education/>} ></Route>
              <Route path="/Physchologist" element={<Physchologist/>} ></Route>
              <Route path="/Report" element={<Report  socket={socket} />} ></Route>
              <Route path='/login' element={<LoginPage/>}> </Route>
              <Route path='/signup' element={<SignUp/>}></Route>
              <Route path='/chat' element={<Chat/>}>  </Route>
              <Route path='/chatlist' element={<ChatList/>} ></Route>
              <Route path='/notifications' element={<NotificationList/>} ></Route>
              <Route path='/allreport' element={<Allreports/>} ></Route>
            </Routes>
          </div>): (<div className='h-auto bg-gray-100 w-[100%] '> <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/Activity" element={<Activity/>} ></Route>
              <Route path="/Education" element={<Education/>} ></Route>
              <Route path="/Physchologist" element={<Physchologist/>} ></Route>
              <Route path="/Report" element={<Report/>} ></Route>
              <Route path='/login' element={<LoginPage/>}> </Route>
              <Route path='/signup' element={<SignUp/>}></Route>
              <Route path='/chat' element={<Chat/>}>  </Route>
              <Route path='/chatlist' element={<ChatList/>} ></Route>
              <Route path='/notifications' element={<NotificationList/>} ></Route>
              <Route path='/allreport' element={<Allreports/>} ></Route>
            </Routes>
          </div>)}
            
        </div>
        <ToastContainer theme='dark' position='top-center' autoClose={2000} />
        </loginContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App