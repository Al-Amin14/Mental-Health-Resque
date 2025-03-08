import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";

const ReportPage = ({ socket }) => {
  const [condition, setCondition] = useState("");
  const [reports, setReports] = useState([]);
  const [newCondition, setNewCondition] = useState("");
  const navigate = useNavigate();
  const {
    reportNotify,
    setReportNotify,
    chatiduser,
    setChatiduser,
    setCheckAnother
  } = useContext(loginContext);
  
  const [socketconnected, setsocketconnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return; // Exit early if no token is found
    }

    socket?.emit("setup", localStorage.getItem("user"));
    socket?.on("connection", () => setsocketconnected(true));
    setCheckAnother(true);
    setChatiduser("");
    
    fetchReports(token);

    // Cleanup socket events when component unmounts
    return () => {
      socket?.off("report found");
    };
  }, [navigate, socket]);

  useEffect(() => {
    if (socket && socketconnected) {
      socket?.on("report found", (notification) => {
        console.log("New report notification received");
        setReportNotify(prev => prev + 1);
      });
    }

    return () => {
      socket?.off("report found");
    };
  }, [socket, socketconnected, reportNotify]);

  const fetchReports = async (token) => {
    try {
      const response = await fetch("http://localhost:3003/reports/myReports", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setReports(data);
      } else {
        alert(`Failed to fetch reports: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error fetching reports: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    if (!condition.trim()) {
      alert("Please describe your condition before submitting.");
      return;
    }

    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch("http://localhost:3003/reports/submitReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ condition })
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.success || "Report submitted successfully.");
        setCondition("");
        setNewCondition(result.datas);
        
        // Emit notification after report submission
        fetch("http://localhost:3003/usersDetails")
          .then(res => res.json())
          .then(resultss => {
            socket?.emit("notifications", resultss);
          });

        fetchReports(token); // Refresh reports after submission
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch (error) {
      alert(`Error submitting report: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="w-[50%] max-[640px]:w-[95%] bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          <span className="text-red-500 max-[640px]:text-[50%]">Emergency</span>
          <span className="text-green-500 max-[640px]:text-[60%]">Mental Health Report</span>
        </h1>
        <p className="text-gray-600 text-center mt-2 font-semibold">
          Please describe your current condition. We’re here to help.
        </p>
        
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Describe your condition:</label>
          <textarea
            id="condition"
            name="condition"
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Write about your condition here..."
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          ></textarea>
          
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white font-bold text-xl py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Report
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600">Your Previous Reports</h2>
          <ul className="mt-4 space-y-3">
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-700">{report.condition}</p>
                  <p className="text-sm text-gray-500">Submitted on: {new Date(report.createdAt).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No reports found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
