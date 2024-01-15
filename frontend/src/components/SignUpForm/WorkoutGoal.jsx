import React from "react";
import { useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import { useEffect, useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";

const WorkoutGoal = (props) => {
  const swiper = useSwiper();

 const options = ['Lose weight', 'Gain weight'];
 const [activeButton, setActiveButton] = useState(null);
 const [showHelpPopup, setShowHelpPopup] = useState(true);
 const [goal, setGoal] = useState("")
 const [weightGoal, setWeightGoal] = useState("");

 useEffect(() => {
   // Retrieve the active button index from local storage on mount
   const storedActiveButton = localStorage.getItem('activeButton');
   const storedWeightGoal = localStorage.getItem("weightGoal");
   if (storedActiveButton !== null) {
     setActiveButton(parseInt(storedActiveButton, 10));
     setGoal(options[activeButton]);
   }
   if (storedWeightGoal !== null) {
    setWeightGoal(parseInt(storedWeightGoal, 10));
  }
 }, []);

 const handleButtonClick = (index) => {
    setActiveButton(index);
    setGoal(options[index]);

   // Update local storage with the active button index
   localStorage.setItem('activeButton', index.toString());
 };

 const handleButtonNext = () => {
  localStorage.setItem('weightGoal', weightGoal.toString());
  const currentWeight = JSON.parse(localStorage.getItem('userData')).weight;
  localStorage.setItem('mainGoal', JSON.stringify(
    {
      name: options[activeButton], 
      goal: options[activeButton]==="Lose weight" ? parseInt(currentWeight) - parseInt(weightGoal) : parseInt(currentWeight) + parseInt(weightGoal), 
      start: currentWeight,
      current : currentWeight, 
      progress: 0,
      entries : [
        {date: new Date(Date.now()), value: currentWeight}
      ]
    }
  ));
 }

  return (
    <>
    <div className="bg-white flex h-screen flex-col justify-between" >
      <div>
        {showHelpPopup ? (
          <div className="bg-gray-200 p-4 mb-4 mx-4 mt-4 rounded-lg">
            <ul>
              <li className="text-sm text-gray-600">
                • Your choice here defines your main goal.
              </li>
              <li className="text-sm text-gray-600">
                • You also have to specify how much weight you want to lose/gain.
              </li>
            </ul>
            <button
              onClick={() => setShowHelpPopup(false)}
              style={{fontSize: "13px"}}
              className="mt-4 bg-[var(--primary-color)] text-white py-2 px-4 rounded-md hover:bg-[var(--primary-color)-dark]"
            >
              Got it!
            </button>
          </div>
        ) : (
          <InfoCircle 
            className="mt-4 w-5 h-5"
            strokeWidth={10}
            color="var(--primary-color)"
            onClick={() => setShowHelpPopup(true)}
          />
        )}
        <div>
          <div className="py-6">
            <h1 className="text-center text-2xl mb-8 font-[500]">
            What is your workout goal?
            </h1>
            <div className="flex gap-4 justify-center flex-wrap">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  style={{
                    backgroundColor: activeButton === index ? 'var(--primary-color)' : 'white',
                    color: activeButton === index ? 'white': 'black',
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
          {activeButton !== null && (
            <div className="py-6 align-items justify-center items-center">
              <h3 className="text-center text-xl mb-3 font-[400]"> How much ?</h3>
              <div className="flex justify-center items-center">
                <input
                  type="number"
                  placeholder="Enter weight"
                  style={{width: "140px"}}
                  className="border rounded-lg outline-none block py-[10px] px-4 mr-2 bg-[#f2f4f6]"
                  value={weightGoal}
                  onChange={(e) => {
                    setWeightGoal(e.target.value);
                  }}
                />
                <span> kg</span>
              </div>
              
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-center">
        <p style={{marginLeft: "140px", marginBottom: "12px"}}> {(props.currentIndex + 1) + "/5"}</p>
        <button
          onClick={() => {
            handleButtonNext();
            swiper.slideNext();
          }}
          type="button"
          disabled= {goal === "" || weightGoal ===  ""}
          style={{background: (goal === "" || weightGoal ===  "") ? "lightgrey" : "var(--primary-color"}}
          className="w-[40px] h-[40px] flex justify-center items-center rounded-full mb-4 ml-auto mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            dataSlot="icon"
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
    </>
  );
};
export default WorkoutGoal;
