//ativity page

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function WellBeing() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center w-full bg-green-50">
      <div className="w-full max-w-7xl p-6">

        {/* Header Section */}
        <header className="text-center bg-green-700 text-white p-6 rounded-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Well-Being Activities</h1>
          <p className="mt-4 text-lg md:text-xl">Take a moment for yourself with calming activities for mind and body.</p>
        </header>

        {/* Activity Cards Section */}
        <section className="mx-[10%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Meditation  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Meditation</h2>
            <p className="text-lg mb-6">Focus your mind and relieve stress with guided meditation sessions.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500"><a href='https://www.timeanddate.com/timer/' target='_blank'>Start Meditation</a></button>
          </div>

          {/* Self-Care  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Self-Care</h2>
            <p className="text-lg mb-6">Relax and rejuvenate with self-care tips and routines.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500"><a href='https://www.timeanddate.com/timer/' target='_blank'>Start Self-Care</a></button>
          </div>

          {/* Breathing Exercises  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Breathing Exercises</h2>
            <p className="text-lg mb-6">Practice simple breathing techniques to calm your mind and body.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500"><a href='https://www.timeanddate.com/timer/' target='_blank'>Start Breathing</a></button>
          </div>

          {/* Journaling  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Journaling</h2>
            <p className="text-lg mb-6">Reflect and write about your thoughts and feelings to clear your mind.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500">Start Journaling</button>
          </div>

          {/* Healthy Recipes  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Healthy Recipes</h2>
            <p className="text-lg mb-6">Explore delicious and nutritious recipes to nourish your body.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500">Get Recipes</button>
          </div>

          {/* Exercise Tips  */}
          <div className="bg-green-200 p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Exercise Tips</h2>
            <p className="text-lg mb-6">Try simple exercises or stretches to boost your mood and energy.</p>
            <button className="bg-green-400 text-white py-2 px-4 rounded-full text-lg transition-transform hover:bg-green-500">Get Exercise Tips</button>
          </div>
        </section>

        
        <footer className="text-center bg-green-500 text-white p-6 rounded-lg mt-8">
          <p className="text-lg font-semibold">Well-Being is about taking care of yourself. Prioritize mental and physical health!</p>
        </footer>

      </div>
    </div>
  );
}

export default WellBeing;