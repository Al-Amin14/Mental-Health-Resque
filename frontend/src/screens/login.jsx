import React, { useContext, useState } from 'react';
import './loginpage.css'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginContext } from '../contex/logincontext';

const LoginPage = () => {
  const { setLoged } = useContext(loginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateing = () => {
    navigate('/signup');
  };

  const loginHandle = () => {
    if (email.length > 4 && password.length > 6) {
      fetch('http://localhost:3003/singin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.error) {
            toast.error(result.error);
          } else {
            setLoged(true);
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('user', result._id);
            toast.success(result.success);
            navigate('/');
          }
        });
    }
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen w-full px-4">
      <div className="login-form bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="login-header text-2xl font-bold text-center text-green-900 mb-6">Welcome Back!</h2>
        <div>
          <div className="input-group mb-4">
            <label htmlFor="email" className="input-label block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="password" className="input-label block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button type="submit" onClick={loginHandle} className="submit-btn w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">Log In</button>
          <button onClick={navigateing} type="submit" className="submit-btn w-full bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg mt-2 hover:bg-gray-400 transition">Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;