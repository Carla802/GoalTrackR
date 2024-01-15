import React from "react";
import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";
const NutritionGoal = (props) => {
  const swiper = useSwiper();

 // What is your nutrition goal?
 const options = ['Eat healthier', 'Eat more protein', 'Cut calories'];
 const [activeButton, setActiveButtonNutri] = useState(null);

 useEffect(() => {
   // Retrieve the active button index from local storage on mount
   const storedActiveButtonNutri = localStorage.getItem('activeButtonNutri');
   if (storedActiveButtonNutri !== null) {
     setActiveButtonNutri(parseInt(storedActiveButtonNutri, 10));
   }
 }, []);

 const handleButtonClick = (index) => {
  if(activeButton===index) {
    setActiveButtonNutri(null);
  }
  else setActiveButtonNutri(index);

    // Update local storage with the active button index
    localStorage.setItem('selectedOptionNutri', activeButton===index ? null : options[index]);
    localStorage.setItem('activeButtonNutri', activeButton===index ? null : index.toString());
 };

  return (
    <div className="bg-white flex flex-col h-screen justify-between">
      <div>
        <div className="py-6">
          <h1 className="text-center text-2xl mb-8 font-[500]">
          What is your nutrition goal?
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
  );
};
export default NutritionGoal;
