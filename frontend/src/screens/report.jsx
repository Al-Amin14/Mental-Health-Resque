import React, { useState } from "react";

const ReportPage = () => {
  const [condition, setCondition] = useState("");

  const handleSubmit = () => {
    if (condition.length<=0) {
      alert("Please describe your condition before submitting.");
    }else{
        // Handle submission logic here (e.g., send data to backend)
        alert("Your report has been submitted successfully!");
        setCondition(""); // Clear the textarea
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="w-[50%] bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl w-full gap-2 justify-center items-center font-bold flex text-center text-blue-600">
          <p className="text-red-500">Emergency</p><p className="text-green-500"> Mental Health Report</p>
        </h1>
        <p className="text-gray-600 text-[105%] text-center mt-2 font-semibold">
          Please describe your current condition. We’re here to help.
        </p>
        <div className="mt-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
            >
              Describe your condition:
            </label>
            <textarea
              id="condition"
              name="condition"
              rows="9"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Write about your condition here..."
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white font-bold text-xl py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;