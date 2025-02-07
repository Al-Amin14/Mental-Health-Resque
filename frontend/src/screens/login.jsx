import React, { useContext, useState } from 'react';
import './loginpage.css'; 
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginContext } from '../contex/logincontext';


const LoginPage = () => {
  const {setLoged} = useContext(loginContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  const navigateing=()=>{
    navigate('/signup')
  }



  const loginHandle=()=>{
    
    if(email.length>4 && password.length>6){
      fetch('http://localhost:3003/singin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      }).then(res=>res.json()).then(result=>{
        if(result.error){
          toast.error(result.error)
        }else{
          setLoged(true)
          localStorage.setItem('jwt',result.token)
          localStorage.setItem('user',result._id)
          toast.success(result.success)
          navigate('/')
        }
      })
    }


  }

  return (
    <div className="login-container h-full w-full  min-h-full">
      <div className="login-form drop-shadow-[0_35px_35px_rgba(26,77,23,0.77)] ">
        <h2 className="login-header">Welcome Back!</h2>
        <div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" onClick={()=>loginHandle()} className="submit-btn mt-2 font-semibold      ">Log In</button>
          <button onClick={()=>navigateing()} type="submit" className="submit-btn mt-2 font-semibold     ">Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
