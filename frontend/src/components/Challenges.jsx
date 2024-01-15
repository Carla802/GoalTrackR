import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Check2, XLg } from "react-bootstrap-icons";
import BottomNav from "./BottomNav";
import ConfirmationModal from "./ConfirmationModal";

function Challenges() {
  const [userWeekly, setUserWeekly] = useState([]);
  const [userDaily, setUserDaily] = useState([]);

  const [weeklyChallenges, setWeeklyChallenges] = useState([]);
  const [dailyChallenges, setDailyChallenges] = useState([]);

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);


  useEffect(() => {
    // Retrieve the stored weekly challenges from local storage
    const storedWeeklyChallenges = localStorage.getItem('weeklyChallenges');
    if (storedWeeklyChallenges !== null && JSON.parse(storedWeeklyChallenges).length !== 0) {
      setWeeklyChallenges(JSON.parse(storedWeeklyChallenges));
    }
    else {
      setWeeklyChallenges([
        {name: 'Complete 150 minutes of cardio exercises', shortname: "Cardio exercise", goal: "150", unit: "min"},
        {name: 'Perform 100 push-ups', shortname: "Push-ups", goal: "100", unit: "count"},
        {name: 'Lift weights for 120 minutes', shortname: "Lift weights", goal: "120", unit: "min"},
        {name: 'Run 20 kilometers', shortname: "Run", goal: "20", unit: "km"},
        {name: 'Complete 500 squats', shortname: "Squats", goal: "500", unit: "count"},
      ]);
    }
    
    // Retrieve the stored daily challenges from local storage
    const storedDailyChallenges = localStorage.getItem('dailyChallenges');
    if (storedDailyChallenges !== null && JSON.parse(storedDailyChallenges).length !== 0) {
      setDailyChallenges(JSON.parse(storedDailyChallenges));
    }
    else{
      setDailyChallenges([
        { name: 'Perform 100 bodyweight squats', shortname: "Bodyweight squats", goal: "100", unit: 'count' },
        { name: 'Consume 3 servings of fruits', shortname: "Servings of fruits", goal: "3", unit: 'count' },
        { name: 'Complete 50 bicycle crunches', shortname: "Bicycle crunches", goal: "50", unit: 'count' },
        { name: 'Drink 8 glasses of water', shortname: "Glasses of water", goal: "8", unit: 'count' },
        { name: 'Perform 3 sets of 15 push-ups', shortname: "Sets of 15 push-ups", goal: "3", unit: 'count' },
      ]);
    }

    const storedUserWeekly = localStorage.getItem('userWeekly');
    if (storedUserWeekly !== null && JSON.parse(storedUserWeekly).length !== 0) {
      setUserWeekly(JSON.parse(storedUserWeekly));
    }
    const storedUserDaily = localStorage.getItem('userDaily');
    if (storedDailyChallenges !== null && JSON.parse(storedUserDaily).length !== 0) {
      setUserDaily(JSON.parse(storedUserDaily));
    }
  }, [])

  const addChallenge = (category, challenge, index) => {
    if(category === "weekly"){
      setUserWeekly((prevData) => (
        [...prevData, {
          name: challenge.name, 
          shortname: challenge.shortname, 
          goal: challenge.goal,
          current: 0,
          unit: challenge.unit, 
          progress: 0,
          entries: [],
        }]
      ));
      removeChallenge("weekly", index);
    }
    else {
      setUserDaily((prevData) => (
        [...prevData, {
          name: challenge.name, 
          shortname: challenge.shortname, 
          goal: challenge.goal,
          current: 0,
          unit: challenge.unit, 
          progress: 0,
          entries: [],
        }]
      ));
      removeChallenge("daily", index);
    } 
  };

  const removeChallenge = (category, index) => {
    category === "weekly" ?
    setWeeklyChallenges((prevData) => {
      const updatedChallenges = [...prevData];
      updatedChallenges.splice(index, 1);
      return updatedChallenges;
    }) :
    setDailyChallenges((prevData) => {
      const updatedChallenges = [...prevData];
      updatedChallenges.splice(index, 1);
      return updatedChallenges;
    });
  }


  // useEffect to save challenges to local storage when userWeekly changes
  useEffect(() => {
    // Save the entire user data object to local storage
    localStorage.setItem('weeklyChallenges', JSON.stringify(weeklyChallenges));
  }, [weeklyChallenges]);

  // useEffect to save challenges to local storage when userWeekly changes
  useEffect(() => {
    // Save the entire user data object to local storage
    localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
  }, [dailyChallenges]);

  // useEffect to save challenges to local storage when userWeekly changes
  useEffect(() => {
    // Save the entire user data object to local storage
    localStorage.setItem('userWeekly', JSON.stringify(userWeekly));
  }, [userWeekly]);

  // useEffect to save challenges to local storage when userWeekly changes
  useEffect(() => {
    // Save the entire user data object to local storage
    localStorage.setItem('userDaily', JSON.stringify(userDaily));
  }, [userDaily]);

  return (
    <>
      <section className="pb-[100px]">
        <div className="lg:w-[640px] w-full h-screen px-[20px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to={"/home"}>
                <ChevronLeft className="w-6 h-6"></ChevronLeft>
              </Link>
              
            </div>
            <h1 className="text-center font-[600] capitalize text-2xl pt-4 mb-4" style={{color: "var(--dark-color)"}}>
              Challenges
            </h1>
            <div className="flex items-center">
            </div>
          </div>
          <div className="mb-4">
          <h4 className="font-[500] mb-2">Weekly Challenges</h4>
            { weeklyChallenges.filter(challenge => !userWeekly.includes(challenge)).slice(0,3).map((challenge,index) => (
              <>
              <div key={"a"+index} className="border-2 p-4 rounded-lg border-[rgba(0,0,0,.1)] mb-3">
              <div key={"b"+index} className="flex justify-between items-center">
                <Link key={"c"+index} to={'#'} style={{width: "240px"}}>{challenge.name}</Link>
                <div key={index} className="flex items-center gap-2">
                  <Link key={"d"+index} to={"#"} onClick={() => {
                    setShowAcceptModal(true);
                    setSelectedItem(["weekly", challenge, index]);
                  }}>
                    <Check2
                      stroke="var(--primary-color)"
                      className="w-6 h-6"
                    />
                  </Link>
                  <Link to={"#"} onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedItem(["weekly", index]);
                  }}>
                    <XLg 
                      stroke="#DD7373"
                      className="w-5 h-5"
                    />
                  </Link>
                </div>
              </div>
            </div>
            </>
            ))}
          </div>
          <div>
            <h4 className="font-[500] mb-2">Daily Challenges</h4>
            { dailyChallenges.slice(0,3).map((challenge,index) => (
              <>
              <div className="border-2 p-4 rounded-lg border-[rgba(0,0,0,.1)] mb-3">
              <div className="flex justify-between items-center">
                <Link to={'#'} style={{width: "240px"}} key={index}>{challenge.name}</Link>
                <div className="flex items-center gap-2">
                  <Link to={"#"} onClick={() => {
                    setShowAcceptModal(true);
                    setSelectedItem(["daily", challenge, index]);
                  }}>
                    <Check2
                      stroke="var(--primary-color)"
                      className="w-6 h-6"
                    />
                  </Link>
                  <Link to={"#"} onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedItem(["daily", index]);
                  }}>
                    <XLg 
                      stroke="#DD7373"
                      className="w-5 h-5"
                    />
                  </Link>
                </div>
              </div>
            </div>
            </>
            ))}
          </div>
        </div>
        <BottomNav />
      </section>
      {showAcceptModal ? (
        <ConfirmationModal 
          title="Accept this challenge"
          description={"This challenge will be added to your current " + selectedItem[0] + " challenges."}
          action={() => {
            selectedItem[0]==="weekly" ? 
            addChallenge("weekly", selectedItem[1], selectedItem[2]) 
            : addChallenge("daily", selectedItem[1], selectedItem[2])
          }}
          close={() => setShowAcceptModal(false)}
        />
      ) : null}
      {showDeleteModal ? (
        <ConfirmationModal 
          title="Don't show this challenge"
          description="This challenge will not appear anymore in your suggestions."
          action={() => {
            selectedItem[0]==="weekly" ? 
            removeChallenge("weekly", selectedItem[1]) 
            : removeChallenge("daily", selectedItem[1])
          }}
          close={() => setShowDeleteModal(false)}
        />
      ) : null}
    </>
  );
};
export default Challenges;
