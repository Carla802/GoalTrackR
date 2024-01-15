import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import BottomNav from "../components/BottomNav";

const Profile = () => {

  // State to store multiple data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    pass: '',
    height: '',
    weight: ''
  });

  // useEffect to load data from local storage on component mount
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('userData');

    // Parse the stored data and update state
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
    <section className="pb-[100px]">
      <div className="lg:w-[640px] w-full h-screen px-[20px] mx-auto">
        {/* <h1 className="text-center text-2xl">Profile</h1> */}
        <div className="mt-3 mb-4">
          <img
            src="Unknown_person.jpg"
            alt="user"
            width={100}
            className="mx-auto rounded-full"
          />
          <h2 className="text-center mt-2 text-xl">{userData.name}</h2>
          
        </div>
        <h1 className="text-xl my-9 font-[500]" style={{color: "var(--dark-color)"}}>Personal Informations</h1>
        <div className="border-b border-[rgba(0,0,0,.2)] pb-2">
          <div className="flex mt-6 gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <div>
              <h2 className="text-[gray]">E-mail</h2>
              <p className="">{userData.email}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-[rgba(0,0,0,.2)] pb-2">
          <div className="flex mt-6 gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            <div>
              <h2 className="text-[gray]">Mobile</h2>
              <p className="text-[lightgray]">Not specified</p>
            </div>
          </div>
        </div>
        <div className="border-b border-[rgba(0,0,0,.2)] pb-2">
          <div className="flex mt-6 gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
            <div>
              <h2 className="text-[gray]">Password</h2>
              <p type="password">{userData.pass.split("").map(char => "*")}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <Link to="/" style={{color: "brown"}}> 
            Log out
          </Link>
        </div>
      </div>
    </section>
    <BottomNav />
    </>
  );
};

export default Profile;
