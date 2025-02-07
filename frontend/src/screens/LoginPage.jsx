import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginContext } from '../contex/logincontext';

const LoginPage = () => {
  const { setLoged } = useContext(loginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const navigateing = () => {
    navigate('/signup');
  };

  const loginHandle = () => {
    if (email.length > 4 && password.length > 6) {
      fetch('http://localhost:3000/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
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
    <div className="h-full w-full min-h-full flex justify-center items-center bg-gradient-to-b from-green-100 to-white">
      <div className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm transform transition-transform hover:scale-105">
        <h2 className="text-base sm:text-lg text-green-600 font-bold text-center mb-3 drop-shadow-md">Welcome Back!</h2>
        <div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm sm:text-base text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-sm sm:text-lg border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm sm:text-base text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-sm sm:text-lg border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => loginHandle()}
            className="w-full py-2 bg-green-400 text-white text-sm sm:text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 active:bg-green-600"
          >
            Log In
          </button>
          <button
            onClick={() => navigateing()}
            type="submit"
            className="w-full py-2 mt-3 bg-green-200 text-green-800 text-sm sm:text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 active:bg-green-400"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
