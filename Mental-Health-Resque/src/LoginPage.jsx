import React from 'react';
import './LoginPage.css'; 

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
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
          <button type="submit" className="submit-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
