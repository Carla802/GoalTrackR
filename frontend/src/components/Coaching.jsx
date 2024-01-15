import { Link } from "react-router-dom";
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import { StarFill, Star, StarHalf } from 'react-bootstrap-icons';

const Coaching = () => {
  const initialCoaches = [
    { name: "Sarah Johnson", category: "Strength Training", rate: "4.9" },
    { name: "John Smith", category: "Nutritional Planning", rate: "4.7" },
    { name: "Emily Davis", category: "Cardiovascular Training", rate: "4" },
    { name: "Michael Rodriguez", category: "Meal Prep Guidance", rate: "4.6" },
    { name: "Amanda Wilson", category: "Functional Training", rate: "3.8" },
    { name: "Daniel Lee", category: "Weight Management", rate: "4.5" },
    { name: "Olivia Turner", category: "Yoga Instruction", rate: "4.8" },
    { name: "Matthew Harris", category: "Sports Nutrition", rate: "4.7" },
    { name: "Sophia Taylor", category: "Pilates Instruction", rate: "4.9" },
    { name: "Ethan Martin", category: "Flexibility Training", rate: "4.6" },
  ];

  const [coaches, setCoaches] = useState(initialCoaches);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredCoaches = initialCoaches.filter((coach) => {
      const firstName = coach.name.split(" ")[0];
      const secondName = coach.name.split(" ")[1];
      return (firstName.toLowerCase().startsWith(query)) || (secondName.toLowerCase().startsWith(query));
    }
    );
    setCoaches(filteredCoaches);
  };

  const handleContact = (coach) => {
    localStorage.setItem("coach", coach);
  }

  const UserIcon = () => {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>
    );
  }

  const MessageIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        data-slot="icon"
        className="w-6 h-6 mx-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>
    )
  }

  const RatingStars = ({ rating }) => {
    const maxRating = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const renderStars = () => {
      const stars = [];
  
      for (let i = 1; i <= maxRating; i++) {
        if (i <= filledStars) {
          stars.push(<StarFill key={i} className="text-yellow-500" />);
        } else if (hasHalfStar && i === filledStars + 1) {
          stars.push(<StarHalf key={i} className="text-yellow-500" />);
        } else {
          stars.push(<Star key={i} className="text-gray-400" />);
        }
      }
  
      return stars;
    };
  
    return (
      <div className="flex items-center">
        {renderStars()}
        <span className="ml-2">{rating}/5</span>
      </div>
    );
  };
  
  return (
    <>
      <section className="pb-[100px]">
        <div className="lg:w-[640px] w-full pb-[100px] h-screen px-[20px] mx-auto">
          <h1 className="text-center font-[600] capitalize text-2xl pt-4 mb-6" style={{color: "var(--dark-color)"}}>
            Coaching
          </h1>
          <div className="mb-2 flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Find a coach" 
              className="border rounded-lg outline-none w-full block py-[10px] px-4 bg-[#f2f4f6]" 
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              data-slot="icon"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            </span>
          </div>
          <div className="mb-16 h-full overflow-y-auto">
            {coaches.map((coach, index) => (
              <div className="border-2 p-4 border-[rgba(0,0,0,.1)] rounded-lg mb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <UserIcon />
                    <div>
                      <h3 className="font-[500]">{coach.name}</h3>
                      <p className="text-sm">{coach.category}</p>
                      <RatingStars rating={coach.rate} />
                    </div>
                  </div>
                  <div className="text-center">
                    <Link to={'/message'} onClick={() => handleContact(coach.name)}>
                    <MessageIcon className="w-8 h-8"/>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
};
export default Coaching;
