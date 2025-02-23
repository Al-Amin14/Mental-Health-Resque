import React, { useState, useEffect, useContext } from "react";
import { FaLeaf } from "react-icons/fa6";
import { GiHiveMind } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaUserDoctor, FaUsers, FaHandsHelping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";

const Home = () => {
  const navigate = useNavigate();
  const [Physchologists, setPhyschologists] = useState([]);
  const [client, setClient] = useState([]);
  const [totalreport, settotalreport] = useState([]);
  const [totalChat, setTotalChat] = useState([]);
  const { chatiduser, setChatiduser, setCheckAnother } = useContext(loginContext);

  const getstarted = () => {
    const token = localStorage.getItem("jwt");
    navigate(token ? "/Education" : "/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setChatiduser("");
    setCheckAnother(true);
    fetch("http://localhost:3003/usersDetails", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setPhyschologists(result.filter((items) => items.role !== "Client" && items._id !== token));
        setClient(result.filter((items) => items.role === "Client"));
      });

    fetch("http://localhost:3003/reports/totalreports", {
      headers: { "Content-Type": "Application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) settotalreport(result);
      });

    fetch("http://localhost:3003/totalchatcout", {
      headers: { "Content-Type": "Application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) setTotalChat(result);
      });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="flex flex-col justify-center items-center gap-6 sm:gap-10 mt-0">
        <FaLeaf className="w-1/3 h-1/3 sm:w-1/4 sm:h-1/4 text-green-900 drop-shadow-lg" />
        <div>
          <p className="text-4xl sm:text-6xl font-bold flex justify-center items-center gap-2 sm:gap-4">
            Be <span className="text-green-600">Mentally</span> Fit
          </p>
          <p className="text-4xl sm:text-6xl font-bold flex justify-center items-center gap-2 sm:gap-4">
            Be <span className="text-green-600">Mentally</span> Free
          </p>
          <p className="text-4xl sm:text-6xl font-bold flex justify-center items-center gap-2 sm:gap-4">
            Be <span className="text-green-600">Safe</span>
          </p>
        </div>
        <div className="text-center max-w-md sm:max-w-lg text-lg sm:text-xl font-semibold">
          Join our community and free yourself from mental stress. Have a great life ahead!
        </div>
        <button onClick={getstarted} className="text-lg sm:text-2xl font-semibold bg-green-600 px-6 py-3 sm:p-4 rounded-full hover:border-black hover:border-2">
          Get Started
        </button>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 mt-9">
        {[{ Icon: GiHiveMind, text: "Practice Mindfulness and Relaxation" },
          { Icon: MdFamilyRestroom, text: "Stay Connected with Family and Friends" },
          { Icon: FaBookOpen, text: "Prioritize Sleep and Routine" }].map(({ Icon, text }, index) => (
          <div key={index} className="w-1/3 sm:w-1/4 bg-slate-200 shadow-lg shadow-green-500 rounded-xl p-5 sm:p-7 font-bold flex flex-col justify-center items-center gap-4 text-center">
            <Icon className="w-10 sm:w-14 h-10 sm:h-14 text-green-600" />
            <p className="text-sm sm:text-base">{text}</p>
          </div>
        ))}
      </div>
      <div className="p-6 sm:p-10 w-full bg-gray-300 rounded-xl mt-10">
        <div className="text-2xl sm:text-4xl font-extrabold text-center">Our Impact</div>
        <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
          {[{ Icon: HiMiniBellAlert, text: `Total Reports: ${totalreport.length}` },
            { Icon: FaUsers, text: `Total Clients: ${client.length}` },
            { Icon: FaUserDoctor, text: `Total Psychologists: ${Physchologists.length}` },
            { Icon: FaHandsHelping, text: `Benefited Users: ${totalChat.length}` }].map(({ Icon, text }, index) => (
            <div key={index} className="w-1/3 sm:w-1/4 bg-slate-200 rounded-xl p-5 sm:p-7 font-bold flex flex-col justify-center items-center gap-4 text-center">
              <Icon className="w-10 sm:w-14 h-10 sm:h-14 text-green-600" />
              <p className="text-sm sm:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;