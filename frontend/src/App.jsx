import { useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ChatList from './screens/chatlist';
import { ToastContainer } from 'react-toastify';
import { loginContext } from './contex/logincontext';
import NotificationList from './components/notification';
import io from 'socket.io-client';

const endpoint = "http://localhost:3003";

function App() {
  const [loged, setLoged] = useState(false);
  const [slideShow, setSlideShow] = useState(true);
  const [notification, setNotification] = useState([]);
  const [totalchat, setTotalchat] = useState([]);
  const [notifcounting, setNotifcounting] = useState(0);
  const [chatiduser, setChatiduser] = useState('');
  const [checkAnother, setCheckAnother] = useState(true);
  const [ioresult, setIoresult] = useState('');
  const [socket, setSocket] = useState(null);

  const token = localStorage.getItem('jwt');
  
  
  useEffect(() => {
    if (token) {
      setSocket(io(endpoint));
      setLoged(true);
    }
  }, [token]);

 
  useEffect(() => {
    if (socket) {
      socket.on('newNotification', (notification) => {
        setNotification((prevNotifications) => [...prevNotifications, notification]);
        setNotifcounting((prevCount) => prevCount + 1);
      });

      socket.on('newMessage', (message) => {
        setTotalchat((prevChats) => [...prevChats, message]);
      });

      // Clean up socket event listeners
      return () => {
        socket.off('newNotification');
        socket.off('newMessage');
      };
    }
  }, [socket]);

  const toggleSlideShow = useCallback(() => {
    setSlideShow((prevState) => !prevState);
  }, []);

  const renderRoutes = useMemo(() => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Activity" element={<Activity />} />
      <Route path="/Education" element={<Education />} />
      <Route path="/Physchologist" element={<Physchologist />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chatlist" element={<ChatList />} />
      <Route path="/notifications" element={<NotificationList />} />
    </Routes>
  ), []);

  const ProtectedRoute = ({ children }) => {
    if (!loged) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div>
        <loginContext.Provider value={{
          socket, setSocket, ioresult, setIoresult, checkAnother, setCheckAnother,
          notifcounting, setNotifcounting, loged, setLoged, totalchat, setTotalchat,
          notification, setNotification, chatiduser, setChatiduser
        }}>
          <Navbar toggleing={toggleSlideShow} socket={socket} />
          <div className="flex w-[100%] h-auto">
            {slideShow && (
              <div className="w-[20%] bg-slate-200 h-auto flex justify-center items-start">
                <SideBar />
              </div>
            )}
            <div className={`h-auto bg-gray-100 ${slideShow ? 'w-[80%]' : 'w-[100%]'}`}>
              {renderRoutes}
            </div>
          </div>
          <ToastContainer theme="dark" position="top-center" autoClose={2000} />
        </loginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
