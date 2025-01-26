import React from 'react';
import './Activity.css'; 

function WellBeing() {
  return (
    <div className="container">
      <header className="header">
        <h1>Well-Being Activities</h1>
        <p>Take a moment for yourself with calming activities for mind and body.</p>
      </header>

      <section className="activity-section">
        <div className="activity-card">
          <h2>Meditation</h2>
          <p>Focus your mind and relieve stress with guided meditation sessions.</p>
          <button className="activity-btn">Start Meditation</button>
        </div>
        <div className="activity-card">
          <h2>Self-Care</h2>
          <p>Relax and rejuvenate with self-care tips and routines.</p>
          <button className="activity-btn">Start Self-Care</button>
        </div>
      </section>

      <section className="activity-section">
        <div className="activity-card">
          <h2>Breathing Exercises</h2>
          <p>Practice simple breathing techniques to calm your mind and body.</p>
          <button className="activity-btn">Start Breathing</button>
        </div>
        <div className="activity-card">
          <h2>Journaling</h2>
          <p>Reflect and write about your thoughts and feelings to clear your mind.</p>
          <button className="activity-btn">Start Journaling</button>
        </div>
      </section>

      <section className="activity-section">
        <div className="activity-card">
          <h2>Healthy Recipes</h2>
          <p>Explore delicious and nutritious recipes to nourish your body.</p>
          <button className="activity-btn">Get Recipes</button>
        </div>
        <div className="activity-card">
          <h2>Exercise Tips</h2>
          <p>Try simple exercises or stretches to boost your mood and energy.</p>
          <button className="activity-btn">Get Exercise Tips</button>
        </div>
      </section>

      <footer className="footer">
        <p>Well-Being is about taking care of yourself. Prioritize mental and physical health!</p>
      </footer>
    </div>
  );
}

export default WellBeing;
