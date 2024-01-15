// Home.js
import React from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const Settings = () => {
  return (
    <section className="">
      <div className="lg:w-[640px] w-full px-[20px] mx-auto">
      <h1 className="text-center font-[600] capitalize text-2xl pt-4 mb-6" style={{color: "var(--dark-color)"}}>
      Settings
          </h1>
        <div className="flex border-b border-[rgba(0,0,0,.2)]">
          {" "}
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <h4 className="text-lg ms-4">Account </h4>
        </div>
        <p className="mt-9 text-[gray]">Edit Profile</p>
        <p className="mt-5 text-[gray]">Change password</p>
        <p className="mt-5 text-[gray]">Facebook</p>
        <div className="flex border-b border-[rgba(0,0,0,.2)] mt-9">
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <h1 className="text-lg ms-4">Notification </h1>
        </div>

        <p className="mt-9 text-[gray]">Notification</p>
        <p className="mt-5 text-[gray]">App notification</p>
        <div className="flex border-b border-[rgba(0,0,0,.2)] mt-9">
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
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>

          <h1 className="text-lg ms-4">More </h1>
        </div>

        <p className="mt-9 text-[gray]">Language</p>
        <p className="mt-5 text-[gray]">Country</p>
      </div>
      <BottomNav />
    </section>
  );
};

export default Settings;
