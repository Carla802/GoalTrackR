import { Link, useLocation } from "react-router-dom";
import React from 'react';

function BottomNav() {
  const location = useLocation();

  return (
    <div>
          <div 
            style={{background: "white"}}
            className="border-t border-[rgba(0,0,0,.2)] lg:w-[640px] w-full px-[20px] mx-auto flex justify-between py-4 fixed bottom-0 lg:left-[50%] inset-x-0 lg:right-auto lg:translate-x-[-50%]">
            <Link to={"/home"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={location.pathname==="/home" ? "var(--primary-color)" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--primary-color)"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 2.25 12 l 8.954 -8.955 c 0.44 -0.439 1.152 -0.439 1.591 0 L 22 12 M 4 12 v 8 c 0 0.621 0.504 1.125 1.125 1.125 H 10 v -4.875 C 9.75 15.504 10.254 15 10.875 15 h 2.25 c 0.621 0 1.125 0.504 1.125 1.125 V 21 h 4.125 C 18.996 21 19.5 20.496 19.5 19.875 v -7.875 M 8.25 21"
                ></path>
              </svg>
            </Link>
            <Link to={"/progress"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={location.pathname==="/progress" ? "var(--primary-color)" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--primary-color)"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                ></path>
              </svg>
            </Link>
            <Link to={"/coaching"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={location.pathname==="/coaching" ? "var(--primary-color)" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--primary-color)"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                ></path>
              </svg>
            </Link>
            <Link to={"/profile"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={location.pathname==="/profile" ? "var(--primary-color)" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--primary-color)"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                ></path>
              </svg>
            </Link>
            <Link to={"/settings"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={location.pathname==="/settings" ? "var(--primary-color)" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--primary-color)"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                ></path>
                <path
                  fill={location.pathname==="/settings" ? "white" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
  )
}

export default BottomNav;