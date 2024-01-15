// Home.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import { useState } from "react";
import CaloricNeeds from "./SignUpForm/CaloricNeeds";
import Diets from "./SignUpForm/Diets";
import NutritionGoal from "./SignUpForm/NutritionGoal";
import WorkoutFrequency from "./SignUpForm/WorkoutFrequency";
import WorkoutGoal from "./SignUpForm/WorkoutGoal";

const SignUp = () => {
  const [swiperController, setSwiperController] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
    localStorage.setItem("currentIndex", swiper.activeIndex.toString());
  };

  return (
    <section className="">
      <div className="lg:w-[640px] w-full px-[20px] mx-auto">
        <Swiper
          onSwiper={(swiper) => {
            setSwiperController(swiper);
            const storedIndex = localStorage.getItem("currentIndex");
            if (storedIndex !== null) {
              //setCurrentIndex(parseInt(storedIndex, 10));
            }
            //swiperController.slideTo(parseInt(storedIndex, 10), 0);
          }}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={1}
          allowTouchMove={false}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <WorkoutGoal currentIndex={currentIndex} />
          </SwiperSlide>
          <SwiperSlide>
            <WorkoutFrequency currentIndex={currentIndex}/>
          </SwiperSlide>
          <SwiperSlide>
            <NutritionGoal currentIndex={currentIndex}/>
          </SwiperSlide>
          <SwiperSlide>
            <Diets currentIndex={currentIndex}/>
          </SwiperSlide>
          <SwiperSlide>
            <CaloricNeeds currentIndex={currentIndex}/>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SignUp;
