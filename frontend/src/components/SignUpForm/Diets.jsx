import React from "react";
import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";

const Diets = (props) => {
  const swiper = useSwiper();

  //Special diet or restrictions
  const options = ['Vegetarian', 'Gluten free', 'Lactose intolerant', 'Hypertension'];
  const [activeButtons, setActiveButtons] = useState([]);
 
  useEffect(() => {
    // Retrieve the active button index from local storage on mount
    const storedActiveButtonDiet = localStorage.getItem('activeButtonsDiet');
    if (storedActiveButtonDiet !== null) {
      setActiveButtons(JSON.parse(storedActiveButtonDiet));
    }
  }, []);
 
  const handleButtonClickDiet = (index) => {
    if(activeButtons.includes(index)) {
      setActiveButtons(prevState => prevState.filter(button => button !== index));
    }
    else setActiveButtons(prevState => [...prevState, index]);
 
    // Update local storage with the active button index
    localStorage.setItem('selectedOptionDiet', 
      activeButtons.length === 0 ? 
        JSON.stringify([]) : 
        JSON.stringify(activeButtons.map(index => options[index])));
    localStorage.setItem('activeButtonsDiet', JSON.stringify(activeButtons));
  };


  return (
    <div className="bg-white flex flex-col h-screen justify-between">
      <div>
        <div className="py-6">
          <h1 className="text-center text-2xl mb-8 font-[500]">
          Special diet or restrictions
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleButtonClickDiet(index)}
              style={{
                backgroundColor: activeButtons.includes(index) ? 'var(--primary-color)' : 'white',
                color: activeButtons.includes(index) ? 'white': 'black',
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
export default Diets;
