import { useState } from 'react'
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

function App() {
  const [slideShow, setSlideShow] = useState(true);

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
        <Navbar toggleing={toggleing} />
        <div className='flex w-[100%] h-auto'>
          {
            slideShow &&
          (<div className='w-[20%] bg-slate-200 h-auto flex justify-center items-start'>
            <SideBar />
          </div>)
          }
            {slideShow ? (<div className='h-auto bg-gray-100 w-[80%] '> <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/Activity" element={<Activity/>} ></Route>
              <Route path="/Education" element={<Education/>} ></Route>
              <Route path="/Physchologist" element={<Physchologist/>} ></Route>
              <Route path="/Report" element={<Report/>} ></Route>
              <Route path='/login' element={<LoginPage/>}> </Route>
              <Route path='/signup' element={<SignUp/>}></Route>
            </Routes>
          </div>): (<div className='h-auto bg-gray-100 w-[100%] '> <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/Activity" element={<Activity/>} ></Route>
              <Route path="/Education" element={<Education/>} ></Route>
              <Route path="/Physchologist" element={<Physchologist/>} ></Route>
              <Route path="/Report" element={<Report/>} ></Route>
              <Route path='/login' element={<LoginPage/>}> </Route>
              <Route path='/signup' element={<SignUp/>}></Route>
            </Routes>
          </div>)}
            
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
