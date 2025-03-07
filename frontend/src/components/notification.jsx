import React, { useContext, useEffect } from "react";
import { loginContext } from "../contex/logincontext";
import { useNavigate } from "react-router-dom";


const notifications = [
  { id: 1, message: "New message from John", type: "info", time: "2 mins ago" },
  { id: 2, message: "You have a new follower", type: "success", time: "5 mins ago" },
  { id: 3, message: "Password updated successfully", type: "success", time: "10 mins ago" },
  { id: 4, message: "Error in submission", type: "error", time: "1 hour ago" },
  { id: 5, message: "Your profile is now public", type: "info", time: "3 hours ago" },
];


const NotificationList = () => {
  const {notification,setNotification,notifcounting,setNotifcounting}=useContext(loginContext)
  const {tochatlist,setTochatlist}=useContext(loginContext)
  const navigate=useNavigate()
    useEffect(() => {
      setNotifcounting(0)
      fetch('http://localhost:3003/notifying/allnotification',{
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
      }).then(res=>res.json()).then(result=>{
        setNotification(result)

        if(!result.error){
          result.map(items=>{
              console.log("_____Not working______")
            fetch('http://localhost:3003/notifying/updatenotification',{
              method:"put",
              headers:{
                "Content-Type":"Application/json"
              },
              body:JSON.stringify({
                _id:items._id
              })
            }).then(res=>res.json()).then(results=>{

                console.log(result)
              
               }
            ).catch(error=>{
              console.log(error)
            })
          })
        }
      })

      

      console.log(notification)

    }, []);

    const navigating=()=>{
      setTochatlist(true)
      navigate()
      navigate('/chat')
    }



    setTimeout(() => {
      console.log("_______")
          notification.map(items=>{
              console.log("_____Not working______")
            fetch('http://localhost:3003/notifying/updatenotification',{
              method:"put",
              headers:{
                "Content-Type":"Application/json"
              },
              body:JSON.stringify({
                _id:items._id
              })
            }).then(res=>res.json()).then(results=>{

                console.log(results)
              
               }
            ).catch(error=>{
              console.log(error)
            })
          })
    }, 5000);


  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notification.map((notification) => (
          <li onClick={navigating}
            key={notification._id}
            className={`p-4 rounded-lg shadow-md "bg-blue-100 text-blue-800"
            `}
    >
            <div className="flex justify-between items-center">
          <span className="font-medium">{notification.content}</span>
                <span className="text-sm text-gray-500">{notification.sender.fullname}</span>
            </div>
          </li>
    ))}
      </ul>
    </div>
  );
};

export default NotificationList;
