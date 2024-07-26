import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({});


  const validForm = ()=>{
    const newErrors = {};

    if(!userName){
        newErrors.userName = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        newErrors.email = "Email is required";
    }else if(!emailPattern.test(email)){
        newErrors.email ="Email is invalid";
    }

    if(!password){
        newErrors.password = "Password is required";
    }else if(password.length < 6){
        newErrors.password = "Password must be at least 6 characters long";
    }

    if(!confirmPassword){
        newErrors.confirmPassword = "Confirm password is required";
    }else if(password !== confirmPassword){
        newErrors.confirmPassword = "Password do not match";
    }

    setShowError(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!validForm()){
        return;
    }

    try {
        
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <div className="bg-transparent border p-5 rounded">
        <div className="text-center py-5">
          <h1 className="text-2xl font-bold text-white">Signup</h1>
        </div>
        <div className="py-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="" className="text-white">
                Name
              </label>
              <input
                onChange={(e) => setuserName(e.target.value)}
                type="text"
                value={userName}
                className="w-full border p-1 rounded"
              />
              {showError.userName && (<p className="text-red-500">{showError.userName}</p>)}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="text-white">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                className="w-full border p-1 rounded"
              />
              {showError.email && (<p className="text-red-500">{showError.email}</p>)}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="text-white">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                className="w-full border p-1 rounded"
              />
              {showError.password && (<p className="text-red-500">{showError.email}</p>)}
            </div>
            <div className="mb-3 relative">
              <label htmlFor="" className="text-white">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                className="w-full border p-1 rounded"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-gray-500"
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
              {showError.confirmPassword && (<p className="text-red-500">{showError.confirmPassword}</p>)}
            </div>
            <div className="py-5">
              <button className="w-full bg-blue-500 p-1 rounded text-white hover:bg-blue-400">
                Signup
              </button>
            </div>
          </form>
          <div className="text-center text-sm">
            <p className="text-gray-400">
              You have already account ?{" "}
              <span className="text-white cursor-pointer">
                <Link to="/login">Login</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
