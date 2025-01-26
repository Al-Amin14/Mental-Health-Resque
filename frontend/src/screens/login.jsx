import React from 'react';
import './loginpage.css'; 
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const navigate=useNavigate()

  const navigateing=()=>{
    navigate('/signup')
  }

  return (
    <div className="login-container h-full w-full  min-h-full">
      <div className="login-form drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] ">
        <h2 className="login-header">Welcome Back!</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="submit-btn mt-2 font-semibold      ">Log In</button>
          <button onClick={()=>navigateing()} type="submit" className="submit-btn mt-2 font-semibold     ">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
