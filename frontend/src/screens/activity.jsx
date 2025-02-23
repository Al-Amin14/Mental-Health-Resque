import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { loginContext } from '../contex/logincontext';

function WellBeing() {
  const { setCheckAnother, chatiduser, setChatiduser } = useContext(loginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate("/login");
    } else {
      setCheckAnother(true);
      setChatiduser("");
    }
  }, []);

  return (
    <div className="flex justify-center w-full bg-green-50 min-h-screen px-4 md:px-6">
      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <header className="text-center bg-green-700 text-white p-6 rounded-lg mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Well-Being Activities</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl">Take a moment for yourself with calming activities for mind and body.</p>
        </header>

        {/* Activity Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Meditation", desc: "Focus your mind and relieve stress with guided meditation sessions.", link: "https://www.timeanddate.com/timer/" },
            { title: "Self-Care", desc: "Relax and rejuvenate with self-care tips and routines.", link: "https://www.timeanddate.com/timer/" },
            { title: "Breathing Exercises", desc: "Practice simple breathing techniques to calm your mind and body.", link: "https://www.timeanddate.com/timer/" },
            { title: "Journaling", desc: "Reflect and write about your thoughts and feelings to clear your mind.", link: "#" },
            { title: "Healthy Recipes", desc: "Explore delicious and nutritious recipes to nourish your body.", link: "#" },
            { title: "Exercise Tips", desc: "Try simple exercises or stretches to boost your mood and energy.", link: "#" },
          ].map((activity, index) => (
            <div key={index} className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4">{activity.title}</h2>
              <p className="text-sm sm:text-base lg:text-lg mb-6">{activity.desc}</p>
              <button className="bg-green-400 text-white py-2 px-4 rounded-full text-sm sm:text-base lg:text-lg transition-transform hover:bg-green-500">
                <a href={activity.link} target='_blank' rel='noopener noreferrer'>
                  {activity.title.includes("Start") ? activity.title : `Start ${activity.title}`}
                </a>
              </button>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center bg-green-500 text-white p-6 rounded-lg mt-8">
          <p className="text-sm sm:text-base lg:text-lg font-semibold">Well-Being is about taking care of yourself. Prioritize mental and physical health!</p>
        </footer>
      </div>
    </div>
  );
}

export default WellBeing;