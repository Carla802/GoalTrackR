import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ChevronLeft } from "react-bootstrap-icons";
const SignUp = () => {
  const navigate = useNavigate();

  // State to store multiple data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    pass: '',
    height: '',
    weight: '',
  });
  const options = ['Sedentary', 'Medium', 'High'];
  const [activeButton, setActiveButton] = useState(null);

  // Function to update the data and save it to local storage
  const updateData = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // useEffect to save data to local storage when userData changes
  useEffect(() => {
    // Save the entire user data object to local storage
    if (!(userData.name === "" && userData.email === "" && userData.pass === "" && userData.weight === "")) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  // useEffect to load data from local storage on component mount
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('userData');
    const storedActiveButton = localStorage.getItem('activeButtonLevel');
    // Parse the stored data and update state
    if (storedData !== null) {
      setUserData(JSON.parse(storedData));
    }
    if (storedActiveButton !== null) {
      setActiveButton(parseInt(storedActiveButton, 10));
    }
  }, []);

  const handleButtonClickLevel = (index) => {
    if (activeButton === index) {
      setActiveButton(null);
    }
    else setActiveButton(index);

    // Update local storage with the active button index
    localStorage.setItem('selectedOptionLevel', activeButton === index ? null : options[index]);
    localStorage.setItem('activeButtonLevel', activeButton === index ? null : index.toString());
  };

  return (
    <div className="lg:w-[640px] w-full px-[20px] mx-auto bg-white flex h-screen flex-col justify-between">
      <div className="bg-white flex flex-col h-screen justify-between">
        <div>
        <div>
          <div className="py-4 border-b mb-10">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link to={"/"}>
                <ChevronLeft className="w-6 h-6"></ChevronLeft>
              </Link>
            </div>
            <h1 className="font-[600] capitalize text-2xl pt-4 mb-4" style={{color: "var(--dark-color)"}}>
              Define your profile
            </h1>
            <div className="flex items-center">
            </div>
          </div>
            <div className="mb-4 flex items-center">
              <label className="mr-2" style={{ width: '110px' }}>Name*</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => updateData('name', e.target.value)}
                className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
                placeholder="Name"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-2" style={{ width: '110px' }}>Email*</label>
              <input
                type="email" value={userData.email}
                onChange={(e) => updateData('email', e.target.value)}
                className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-2" style={{ width: '110px' }}>Password*</label>
              <input
                type="password" value={userData.pass}
                onChange={(e) => updateData('pass', e.target.value)}
                className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center">
            <label className="mr-2" style={{ width: '110px' }}>Height</label>
            <input
              type="text"
              value={userData.height}
              onChange={(e) => updateData('height', e.target.value)}
              className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
              placeholder="Height"
            />
            <label className="ml-4">cm</label>
          </div>

          <div className="mb-4 flex items-center">
            <label className="mr-2" style={{ width: '110px' }}>Weight*</label>
            <input
              type="text"
              value={userData.weight}
              onChange={(e) => updateData('weight', e.target.value)}
              className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
              placeholder="Weight"
            />
            <label className="ml-4">kg</label>
          </div>

          <div className="mb-2">
            <h1 className="text-center text-xl mb-4 mt-6 font-[500]">What is your level of activity?</h1>
            <div className="flex gap-4 justify-center flex-wrap">

              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClickLevel(index)}
                  style={{
                    backgroundColor: activeButton === index ? 'var(--primary-color)' : 'white',
                    color: activeButton === index ? 'white' : 'black',
                    padding: '10px',
                    margin: '5px',
                    cursor: 'pointer',
                  }}
                  className="inline-block py-2 px-4 border border-[var(--primary-color)] rounded-lg text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"

                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/form");
            }}
            type="button"
            disabled={(userData.name === "" || userData.email === "" || userData.pass === "" || userData.weight === "") ? true : false}
            style={{ background: (userData.name === "" || userData.email === "" || userData.pass === "" || userData.weight === "") ? "lightgrey" : "var(--primary-color" }}
            className="w-[210px] h-[40px] text-white flex justify-center items-center rounded-full mb-4 mt-10 ml-auto mr-4"
          >
            Define your goals
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
