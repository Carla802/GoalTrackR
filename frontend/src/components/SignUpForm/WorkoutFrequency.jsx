import React from "react";
import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";

const WorkoutFrequency = (props) => {
  const swiper = useSwiper();

  // How often do you want to exercise?
  const options = ['1-2', '3-4', '5-6', '7+'];
  const [activeButton, setActiveButton] = useState(null);
  const [showHelpPopup, setShowHelpPopup] = useState(true);
 
  useEffect(() => {
    // Retrieve the active button index from local storage on mount
    const storedActiveButton = localStorage.getItem('activeButtonExercise');
    if (storedActiveButton !== null) {
      setActiveButton(parseInt(storedActiveButton, 10));
    }
  }, []);
 
  const handleButtonClick = (index) => {
    if(activeButton===index) {
      setActiveButton(null);
    }
    else setActiveButton(index);
 
    // Update local storage with the active button index
    localStorage.setItem('selectedOptionExercise', activeButton===index ? null : options[index]);
    localStorage.setItem('activeButtonExercise', activeButton===index ? null : index.toString());
  };

  return (
    <>
    <div className="bg-white flex h-screen flex-col justify-between">
      <div>
        {showHelpPopup ? (
          <div className="bg-gray-200 p-4 mb-4 mx-4 mt-4 rounded-lg">
              <p className="text-sm text-gray-600">
                By answering the next few questions, you allow us to suggest you more accurate challenges related to your goals.
              </p>
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
      <div className="py-6">
        <h1 className="text-center text-2xl mb-8 font-[500]">
          How often do you want to exercise?
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
        <div className="flex justify-center flex-wrap mt-4">
          <span>in a week</span>
        </div>
      </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            swiper.slidePrev();
          }}
          type="button"
          className="bg-[var(--primary-color)] w-[40px] h-[40px] flex justify-center items-center rounded-full mb-4 ml-4"
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <p style={{marginTop: "8px"}}> {(props.currentIndex + 1) + "/5"}</p>
        <button
          onClick={() => {
            swiper.slideNext();
          }}
          type="button"
          className="bg-[var(--primary-color)] w-[40px] h-[40px] flex justify-center items-center rounded-full mb-4 mr-4"
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
export default WorkoutFrequency;
