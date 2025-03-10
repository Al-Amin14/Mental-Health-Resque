import React, { useContext, useEffect } from "react";
import { loginContext } from "../contex/logincontext";
import { useNavigate } from "react-router-dom";


const reports = [
  { id: 1, message: "New message from John", type: "info", time: "2 mins ago" },
  { id: 2, message: "You have a new follower", type: "success", time: "5 mins ago" },
  { id: 3, message: "Password updated successfully", type: "success", time: "10 mins ago" },
  { id: 4, message: "Error in submission", type: "error", time: "1 hour ago" },
  { id: 5, message: "Your profile is now public", type: "info", time: "3 hours ago" },
];


const reportList = () => {
  const {report,setreport}=useContext(loginContext)
  const {setTochatlist}=useContext(loginContext)
  const navigate=useNavigate()
    useEffect(() => {
      fetch('http://localhost:3003/reports/totalreports').then(res=>res.json()).then(result=>{
        setreport(result)
      })

      console.log(report)

    }, []);

    const navigating=()=>{
      setTochatlist(true)
      navigate()
      navigate('/chat')
    }

  
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">reports</h2>
      <ul className="space-y-4">
        {report.map((report) => (
          <li onClick={navigating}
            key={report._id}
            className={`p-4 rounded-lg shadow-md "bg-blue-100 text-blue-800"
            `}
        >
            <div className="flex justify-between items-center">
          <span className="font-medium">{report.condition}</span>
                <span className="text-sm text-gray-500">{
                    report.user._id==localStorage.getItem('user')?"You":(report.user.fullname)
                }</span>
            </div>
          </li>
    ))}
      </ul>
    </div>
  );
};

export default reportList;
