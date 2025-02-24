import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";

const ReportPage = () => {
  const [condition, setCondition] = useState("");
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { chatiduser, setChatiduser, setCheckAnother } = useContext(loginContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      setCheckAnother(true);
      setChatiduser("");
      fetchReports(token);
    }
  }, []);

  const fetchReports = async (token) => {
    const response = await fetch("http://localhost:3003/reports/myReports", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setReports(data);
    } else {
      alert("Failed to fetch reports");
    }
  };

  const handleSubmit = async () => {
    if (condition.trim().length === 0) {
      alert("Please describe your condition before submitting.");
      return;
    }
    const token = localStorage.getItem("jwt");
    const response = await fetch("http://localhost:3003/reports/submitReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ condition }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.success);
      setCondition("");
      fetchReports(token);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center flex items-center justify-center gap-2">
          <span className="text-red-500 text-base sm:text-xl">Emergency</span>
          <span className="text-green-500 text-lg sm:text-2xl">Mental Health Report</span>
        </h1>
        <p className="text-gray-600 text-center mt-2 text-sm sm:text-base font-semibold">
          Please describe your current condition. We’re here to help.
        </p>
        
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Describe your condition:
          </label>
          <textarea
            id="condition"
            name="condition"
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            placeholder="Write about your condition here..."
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white font-bold text-lg sm:text-xl py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Report
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Your Previous Reports</h2>
          <ul className="mt-4 space-y-3">
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow text-sm sm:text-base">
                  <p className="text-gray-700">{report.condition}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Submitted on: {new Date(report.createdAt).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">No reports found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;