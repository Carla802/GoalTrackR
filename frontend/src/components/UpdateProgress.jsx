import { Link } from "react-router-dom";
import React from "react";
import {useState, useEffect } from 'react';
import BottomNav from "./BottomNav";
import { ChevronLeft } from "react-bootstrap-icons";

const UpdateProgress = () => {

   // State to store multiple data
   const [weight, setWeight] = useState("");
   const [userWeekly, setUserWeekly] = useState([]);
   const [userDaily, setUserDaily] = useState([]);

  // useEffect to load data from local storage on component mount
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('userData');
    const storedWeekly = localStorage.getItem("userWeekly");
    const storedDaily = localStorage.getItem("userDaily");

    // Parse the stored data and update state
    if (storedData) {
      setWeight(JSON.parse(storedData).weight);
    }
    if (storedWeekly) {
      setUserWeekly(JSON.parse(storedWeekly));
    }
    if (storedDaily) {
      setUserDaily(JSON.parse(storedDaily));
    }
  }, []);

  const updateWeeklyChallenge = (index, value) => {
    if(!isNaN(value) && value){
      setUserWeekly((prevUserWeekly) => {
        return updateChallenge(prevUserWeekly, index, value)
      });
    }
  };

  const updateDailyChallenge = (index, value) => {
    if(!isNaN(value) && value){
      setUserDaily((prevUserDaily) => {
        return updateChallenge(prevUserDaily, index, value)
      });
    }
  };

  const updateChallenge = (prevState, index, value) => {
      const newState = [...prevState];
      const updatedChallenge = { ...newState[index] };
      
      // Update the current value by adding the entered value
      updatedChallenge.current = parseInt(updatedChallenge.current) + parseInt(value);
      
      // Update progress based on current and goal
      updatedChallenge.progress = parseInt(updatedChallenge.current) / parseInt(updatedChallenge.goal);
  
      // Update entries with the new current value
      updatedChallenge.entries = [
        ...updatedChallenge.entries,
        { date: new Date(Date.now()), value: updatedChallenge.current },
      ];
  
      // Update the challenge in the array
      newState[index] = updatedChallenge;
      return newState;
  };

  const handleUpdate = () => {
    try{
      const commonDate = new Date(); // Create a single date for all entries
      const mainGoal = JSON.parse(localStorage.getItem("mainGoal"));
    // Update main goal
      if (!isNaN(weight) && mainGoal) {
        
        const weightValue = parseFloat(weight);
        const startValue = parseInt(mainGoal.start);
        const goalValue = parseInt(mainGoal.goal);
        let progress = 0;
    
        if (!isNaN(weightValue) && !isNaN(startValue) && !isNaN(goalValue)) {
          const denominator = goalValue - startValue;
          progress = denominator !== 0 ? (weightValue - startValue) / denominator : 0;
        } else {
          console.log("Invalid numeric values");
        }
    
        localStorage.setItem("mainGoal", JSON.stringify({
          name: mainGoal.name,
          goal: mainGoal.goal,
          start: mainGoal.start,
          current: weight,
          progress: progress,
          entries: [
            ...mainGoal.entries,
            { date: commonDate, value: weight },
          ],
        }));
        let storedUserData = JSON.parse(localStorage.getItem("userData"));
        storedUserData.weight = weight;
        localStorage.setItem("userData", JSON.stringify(storedUserData));
      }
    
      // Update challenges
      const updatedUserWeekly = userWeekly.map(challenge => ({
        ...challenge,
        entries: [
          ...challenge.entries,
          { date: commonDate, value: challenge.current }, // You may want to adjust this value as needed
        ],
      }));
      localStorage.setItem("userWeekly", JSON.stringify(updatedUserWeekly));
    
      const updatedUserDaily = userDaily.map(challenge => ({
        ...challenge,
        entries: [
          ...challenge.entries,
          { date: commonDate, value: challenge.current }, // You may want to adjust this value as needed
        ],
      }));
      localStorage.setItem("userDaily", JSON.stringify(updatedUserDaily));
    } catch (e){
      console.log(e);
    }
    
  };
  

  return (
    <>
      <section className="pb-[100px]">
        <div className="lg:w-[640px] w-full h-screen px-[20px] mx-auto justify-between">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link to={"/progress"}>
                <ChevronLeft className="w-6 h-6"></ChevronLeft>
              </Link>
            </div>
            <h1 className="font-[600] capitalize text-2xl pt-4 mb-4" style={{color: "var(--dark-color)"}}>
              Update your progress
            </h1>
            <div className="flex items-center">
            </div>
          </div>
          <div className="ml-2 mr-2">
            <div className="mb-4 mt-4 flex items-center">
              <p style={{width: "100px"}}>Weight</p>
              <input
                type="number" value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{width: "150px"}}
                className="border outline-none block py-[10px] px-4 m-2 rounded-lg bg-[#f2f4f6]"
                placeholder="Weight"
              />
              <p>kg</p>
            </div>
            {userWeekly.map((challenge, index) => (
              <div className="mb-4 mt-4 flex items-center">
                <p style={{width: "100px"}}>{challenge.shortname}</p>
                <input
                  type="number"
                  onBlur={(e) => updateWeeklyChallenge(index, e.target.value)}
                  style={{width: "150px"}}
                  className="border outline-none block py-[10px] px-4 m-2 rounded-lg bg-[#f2f4f6]"
                  placeholder={challenge.shortname}
                />
                <p>{challenge.unit}</p>
              </div>
            ))}
            {userDaily.map((challenge, index) => (
              <div className="mb-4 mt-4 flex items-center">
                <p style={{width: "100px"}}>{challenge.shortname}</p>
                <input
                  type="number"
                  onBlur={(e) => updateDailyChallenge(index, e.target.value)}
                  style={{width: "150px"}}
                  className="border outline-none block py-[10px] px-4 m-2 rounded-lg bg-[#f2f4f6]"
                  placeholder={challenge.shortname}
                />
                <p>{challenge.unit}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center my-5 gap-x-4 mt-9">
            <div className="text-center">
              <Link
                to={"/progress"}
                className="py-3 px-9 bg-[var(--primary-color)] text-white rounded-full"
                onClick={handleUpdate}
              >
                Update
              </Link>
            </div>
          </div>
        </div>
        
      </section>
      <BottomNav />
    </>
  );
};
export default UpdateProgress;
