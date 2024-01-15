import React from "react";
import { Link } from "react-router-dom";
import { useSwiper } from "swiper/react";

const CaloricNeeds = (props) => {
  const swiper = useSwiper();

  return (
    <div className="bg-white flex flex-col h-screen justify-between">
      <div>
        <div className="py-6">
          <h1 className="text-center text-2xl mb-8 font-[500]">
          What are your daily caloric needs?
          </h1>
          <div className="mb-4">
          <input
            type="text"
            className="border outline-none w-full block py-[10px] px-4 rounded-lg bg-[#f2f4f6]"
            placeholder="in Kcal"
          />
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
        <Link
          to={'/home'}
          type="button"
          className="bg-[var(--primary-color)] w-[100px] h-[40px] flex justify-center items-center rounded-[40px] mb-4 mr-4"
          style={{
            color: "white",
          }}
        >
          Submit
        </Link>
      </div>
    </div>
  );
};
export default CaloricNeeds;
