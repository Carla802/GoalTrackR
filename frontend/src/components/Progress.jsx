import { Link } from "react-router-dom";
import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart ,LineElement,LinearScale, PointElement } from "chart.js";
import { useState, useEffect } from 'react';
import BottomNav from "../components/BottomNav";

const Progress = () => {

  const [openTab, setOpenTab] = React.useState(1);
  const [mainGoal, setMainGoal] = useState({
    entries: []
  });
  const [mainGoalValues, setMainGoalValues] = useState([]);

  const [dates, setDates] = useState([]);
  const [datesGoal, setDatesGoal] = useState([]);

  const [userWeekly, setUserWeekly] = useState([]);
  const [userDaily, setUserDaily] = useState([]);

  const formatDate = (date) => {
    const dateObject = new Date(date);

    // Extract day and month components
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Note: Months are zero-based

    // Format day and month with leading zeros if needed
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  }

  // useEffect to load data from local storage on component mount
  useEffect(() => {
    // Retrieve data from local storage
    const storedMainGoal = localStorage.getItem("mainGoal");
    const storedWeekly = localStorage.getItem("userWeekly");
    const storedDaily = localStorage.getItem("userDaily");
  
    // Parse the stored data and update state
    if (storedWeekly) {
      setUserWeekly(JSON.parse(storedWeekly));
    }
    if (storedDaily) {
      setUserDaily(JSON.parse(storedDaily));
    }
    if (storedMainGoal) {
      const parsedMainGoal = JSON.parse(storedMainGoal);
      setMainGoal(parsedMainGoal);
  
      const allEntries = [
        ...parsedMainGoal.entries,
        ...userWeekly.flatMap(challenge => challenge.entries),
        ...userDaily.flatMap(challenge => challenge.entries),
      ];
  
      setDates(allEntries.map((entry) => {
        return entry.date;
      }).sort((a,b) => new Date(b) - new Date(a)));
  
      setMainGoalValues(parsedMainGoal.entries.map((entry) => entry.value));
  
      setDatesGoal(parsedMainGoal.entries.filter(entry => entry.value).map((entry) => {
        const date = new Date(entry.date);
        return formatDate(date);
      }));
    }
  }, []);
  
 
  const data = {
    labels: datesGoal, 
    datasets: [
      {
        label: "Weight",
        data: mainGoalValues.filter(value => value),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#3E5A4F"
      },
    ]
  };
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  return (
    <>
      <section className="">
        <div className="lg:w-[640px] w-full px-[20px] mx-auto bg-white flex h-screen flex-col justify-between pb-[100px]">
        <div>
          <h1 className="text-center font-[600] capitalize text-2xl pt-4 mb-6" style={{color: "var(--dark-color)"}}>
            Your Progress
          </h1>
          <ul className="flex justify-center mb-9">
            <li>
              <span
                className={
                  "block py-3 px-4 cursor-pointer rounded-l " +
                  (openTab === 1 ? "bg-[var(--primary-color)] text-white" : "bg-[#f2f4f6]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                Table
              </span>
            </li>
            <li>
              <span
                className={
                  "block py-3 px-4 cursor-pointer rounded-r " +
                  (openTab === 2 ? "bg-[var(--primary-color)] text-white" : "bg-[#f2f4f6]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                Chart
              </span>
            </li>
          </ul>
          <div>
          <div className={(openTab === 1 ? "block" : "hidden")} style={{ overflowX: 'auto', maxHeight: '300px' }}>
            <table className="w-full rounded" style={{ borderRadius: "10px", tableLayout: 'auto' }}>
              <thead>
                <tr>
                  <th className="border py-3 px-2">Date</th>
                  <th className="border py-3 px-2">Weight</th>
                  {/* Add more columns for additional data */}
                  {/* Column names for weekly challenges */}
                  {userWeekly.map((challenge, challengeIndex) => (
                    <th key={`week-${challengeIndex}`} className="border py-3 px-2">
                      {challenge.shortname}
                    </th>
                  ))}
                  {/* Column names for daily challenges */}
                  {userDaily.map((challenge, challengeIndex) => (
                    <th key={`day-${challengeIndex}`} className="border py-3 px-2">
                      {challenge.shortname}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dates.map((date, index) => {
                  // Check if there's at least one non-empty cell in the row
                  const hasNonEmptyCell = (mainGoal.entries.some(entry => entry.date === date) || 
                    userWeekly.some(challenge => challenge.entries.some(entry => entry.date === date)) || 
                    userDaily.some(challenge => challenge.entries.some(entry => entry.date === date)));
                  
                  // Render the row only if there's at least one non-empty cell
                  return hasNonEmptyCell ? (
                    <tr key={index}>
                      <td className="border py-3 px-2 text-center">{formatDate(date)}</td>
                      <td className="border py-3 px-2 text-center">{
                        mainGoal.entries.find(entry => entry["date"] === date) ? 
                        mainGoal.entries.find(entry => entry["date"] === date).value : "-"}</td>
                      {/* Add more cells for additional data */}
                      {/* Display entries for weekly challenges */}
                      {userWeekly.map((challenge, challengeIndex) => (
                        <td key={`week-${challengeIndex}`} className="border py-3 px-2 text-center">
                          {challenge.entries.find(entry => entry["date"] === date) ? 
                          challenge.entries.find(entry => entry["date"] === date).value : '-'}
                        </td>
                      ))}
                      {/* Display entries for daily challenges */}
                      {userDaily.map((challenge, challengeIndex) => (
                        <td key={`day-${challengeIndex}`} className="border py-3 px-2 text-center">
                          {challenge.entries.find(entry => entry["date"] === date) ? 
                          challenge.entries.find(entry => entry["date"] === date).value : '-'}
                        </td>
                      ))}
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>

            <div className={openTab === 2 ? "block" : "hidden"}>
            <div style={{ height: '300px', overflowY: 'auto' }}>
              <Line
                data={data}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: Math.min(...mainGoalValues.filter(value => value)) - 5,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false, // Set this to false to allow manual control over height
                }}
              />
            </div>
            </div>
          </div>
          </div>
          <div className="mt-9 text-center">
            <Link
              to={"/update-progress"}
              className="py-3 px-9 bg-[var(--primary-color)] text-white rounded-full"
            >
              Update
            </Link>
          </div>
        </div>
        <BottomNav />
      </section>
    </>
  );
};
export default Progress;