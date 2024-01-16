import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, PlusLg } from 'react-bootstrap-icons';
import BottomNav from "./BottomNav";
import ConfirmationModal from "./ConfirmationModal";

function Home () {
  const [showWeeklyChallenges, setShowWeeklyChallenges] = useState(true);
  const [showDailyChallenges, setShowDailyChallenges] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [ selectedItem, setSelectedItem ] = useState([]);

  const handleClearLocalStorage = () => {
    // Clear all local storage data except user data
    localStorage.removeItem("weeklyChallenges");
    localStorage.removeItem("dailyChallenges");
    localStorage.removeItem("userDaily");
    localStorage.removeItem("userWeekly");
    localStorage.removeItem("userDaily");
  };

  const [mainGoal, setMainGoal] = useState({
    name: undefined,
    goal: undefined,
    progress: undefined
  });
  const [weeklyChallenges, setWeeklyChallenges] = useState([]);
  const [dailyChallenges, setDailyChallenges] = useState([]);

  useEffect(() => {
    // Retrieve the main goal from local storage
    const storedMainGoal = localStorage.getItem('mainGoal');
    if (storedMainGoal !== null) {
      setMainGoal(JSON.parse(storedMainGoal));
    }
    // Retrieve the stored weekly challenges from local storage
    const storedWeeklyChallenges = localStorage.getItem('userWeekly');
    if (storedWeeklyChallenges !== null && storedWeeklyChallenges.length !== 0) {
      setWeeklyChallenges(JSON.parse(storedWeeklyChallenges));
    }
    // Retrieve the stored daily challenges from local storage
    const storedDailyChallenges = localStorage.getItem('userDaily');
    if (storedDailyChallenges !== null && storedDailyChallenges !== 0) {
      setDailyChallenges(JSON.parse(storedDailyChallenges));
    }
  }, []);

  const [deleteWeekly, setDeleteWeekly] = useState(Array(weeklyChallenges.length).fill(false));
  const [deleteDaily, setDeleteDaily] = useState(Array(weeklyChallenges.length).fill(false));

  const toggleDelete = (index, category) => {
    category === "weekly" ? 
    setDeleteWeekly((prevIcons) => {
      const newIcons = [...prevIcons];
      newIcons[index] = !newIcons[index];
      return newIcons;
    }) : 
    setDeleteDaily((prevIcons) => {
      const newIcons = [...prevIcons];
      newIcons[index] = !newIcons[index];
      return newIcons;
    })
  };

  const deleteChallenge = (category, index) => {
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
    localStorage.setItem('userWeekly', JSON.stringify(weeklyChallenges));
  }, [weeklyChallenges]);

  // useEffect to save challenges to local storage when userWeekly changes
  useEffect(() => {
    // Save the entire user data object to local storage
    localStorage.setItem('userDaily', JSON.stringify(dailyChallenges));
  }, [dailyChallenges]);

  return (
    <>
      <section className="pb-[100px]">
        <div className="lg:w-[640px] w-full px-[20px] mx-auto">
          <h1 className="text-center font-[600] capitalize text-2xl pt-4 mb-6" style={{color: "var(--dark-color)"}}>
            Home
          </h1>
          <div className="mb-6">
            <div className="flex justify-between pb-3">
              <h4 className="font-[500]">Main goal</h4>
              <button type="button" onClick={() => setShowEditModal(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="border-2 p-4 rounded-lg border-[rgba(0,0,0,.1)]">
              <div className="flex justify-between items-center">
                <h4>{mainGoal.name !== undefined ? (
                    <p>{(mainGoal.name === "Gain weight" ? "Gain " : "Lose ") + (mainGoal.goal ? (Math.abs(parseInt(mainGoal.goal)-parseInt(mainGoal.start)) + "kg") : "weight")}</p>
                  ) : (
                    <p>No main goal selected</p>
                  )}</h4>
                <meter value={mainGoal.progress} content="width=device-width, initial-scale=1.0"/>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-4">
              <div className="flex justify-between pb-3">
              <h4 className="font-[500]">Challenges</h4>
                <Link to={"/challenges"}>
                  <PlusLg stroke="" className="w-6 h-6" fill="currentColor"></PlusLg>
                </Link>
              </div>
              <div className="border-2 border-[rgba(0,0,0,.1)] py-3 px-2 rounded-lg">
                <div className="flex justify-between">
                  <h4>Weekly Challenge</h4>
                  <button
                    variant="link"
                    size="sm"
                    onClick={() => setShowWeeklyChallenges(!showWeeklyChallenges)}
                  >
                    {showWeeklyChallenges ? <ChevronUp className="icon-show"/> : <ChevronDown className="icon-show"/>}
                  </button>
                </div>
                {showWeeklyChallenges && (
                  weeklyChallenges.length === 0 ? (
                    <span style={{fontSize: "13px"}}> You don't have any weekly challenges yet...</span>
                  ) : 
                  weeklyChallenges.map((challenge, index) => {
                    return (
                    <div className="mt-3 flex items-center gap-4">
                      <div 
                        className="border-2 border-[rgba(0,0,0,.1)] rounded-lg p-4 w-full cursor-pointer" 
                        //style={{boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19)"}}
                        onClick={() => toggleDelete(index, "weekly")}
                      >
                        <div className="flex justify-between items-center">
                          <h4 style={{width: deleteWeekly[index] ? "140px" : "190px"}}>{challenge.name}</h4>
                          <meter value={challenge.progress} />
                        </div>
                      </div>
                      {deleteWeekly[index] && <span className="cursor-pointer" 
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedItem(["weekly", index]);
                          toggleDelete(index, "weekly")
                        }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </span>}
                    </div>
                  )}
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="border-2 border-[rgba(0,0,0,.1)] py-3 px-2 rounded-lg">
                <div className="flex justify-between">
                  <h4>Daily Challenge</h4>
                  <button
                    variant="link"
                    size="sm"
                    onClick={() => setShowDailyChallenges(!showDailyChallenges)}
                  >
                    {showDailyChallenges ? <ChevronUp className="icon-show"/> : <ChevronDown className="icon-show"/>}
                  </button>
                </div>
                {showDailyChallenges && (
                  dailyChallenges.length === 0 ? (
                    <span style={{fontSize: "13px"}}> You don't have any daily challenges yet...</span>
                  ) :  
                  dailyChallenges.map((challenge, index) => {
                    return (
                    <>
                    <div className="mt-3 flex items-center gap-4">
                      <div 
                        className="border-2 border-[rgba(0,0,0,.1)] rounded-lg p-4 w-full cursor-pointer"
                        onClick={() => toggleDelete(index, "daily")}
                      >
                        <div className="flex justify-between items-center">
                          <h4 style={{width: deleteDaily[index] ? "140px" : "190px"}}>{challenge.name}</h4>
                          <meter value={challenge.progress} />
                        </div>
                      </div>
                      { deleteDaily[index] && <span className="cursor-pointer" 
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedItem(["daily", index]);
                          toggleDelete(index, "daily");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </span>}
                    </div>
                    </>
                  )}
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </section>
      <BottomNav />
      {showEditModal ? (
        <ConfirmationModal 
          title="Edit Main Goal"
          description="You will lose all data related to your current goal"
          to="/form"
          action={handleClearLocalStorage}
          close={() => setShowEditModal(false)}
        />
      ) : null}
      {showDeleteModal ? (
        <ConfirmationModal 
          title="Delete Challenge"
          description="You will lose all data related to this challenge"
          action={() => {
            selectedItem[0]==="weekly" ? 
            deleteChallenge("weekly", selectedItem[1]) 
            : deleteChallenge("daily", selectedItem[1])
          }}
          close={() => setShowDeleteModal(false)}
        />
      ) : null }
    </>
  );
};
export default Home;
