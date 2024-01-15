import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State to store multiple data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    pass: '',
    height: '',
    weight: '',
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('userData');
    // Parse the stored data and update state
    if (storedData !== null) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogin = () => {
    if((userData.email || userData.name) && userData.pass) {
      if(email === userData.email && password === userData.pass){
        navigate("/home");
        setError("");
      }
      else {
        setError("Invalid email or password");
      }
    }
    else {
      setError("You don't have an account yet");
    }
  }

  return (
    <section className="">
      <div className="lg:w-[640px] w-full px-[20px] mx-auto">
       <h1 className="text-center font-[600] capitalize text-2xl pt-4 mt-4 mb-16" style={{color: "var(--dark-color)"}}>Login</h1>
       <div className="flex items-center">
        <span className="flex text-[brown]"> {error} </span>
       </div>
       <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
            placeholder="Password"
          />
        </div>
        <div className="mb-8 flex items-center justify-between">
            <label className="flex items-center gap-2">
                <input type="checkbox"/> <span className="text-sm">Remember me</span>
            </label>
            <Link href="#" className="text-sm">Forgot Password?</Link>
        </div>
        <div className="mb-8">
            <button 
              onClick={handleLogin}
              className="block w-full bg-[var(--primary-color)] py-[10px] px-4 rounded-lg text-white text-center"
            >Login</button>
        </div>
        <p className="text-center">Don't have an account? <Link to={'/sign-up'} className="text-[var(--primary-color)]">Register here</Link></p>
      </div>
    </section>
  );
};

export default Login;