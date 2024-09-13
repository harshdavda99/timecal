import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CountdownTimer.css"; // Import your custom CSS file for animations
import rocketImage from "../../public/assets/rocket.gif";
import rocketImage1 from "../../public/assets/rockets.gif";
const SmaokeImage = `https://toppng.com/uploads/preview/rocket-rocket-launches-gif-11563612363fdemn3gstk.png`;

const CountdownTimer = () => {
  const getLocalData = JSON.parse(localStorage?.getItem("timelogs"));
  const remainingTime = calculateRemainingTime(
    getLocalData?.officeInTime,
    getLocalData?.workingHours,
    getLocalData?.totalBreak
  );
  const [time, setTime] = useState(remainingTime);
  const [launch, setLaunch] = useState(false);

  function calculateRemainingTime(officeInTime, workingHours, totalBreak) {
    if ((officeInTime, workingHours, totalBreak)) {
      // Helper function to convert time strings (HH:MM) to minutes
      function timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      }

      // Calculate in-time, working hours, and total break in minutes
      const inTimeMinutes = timeToMinutes(officeInTime);
      const workingMinutes = timeToMinutes(workingHours);
      const breakMinutes = timeToMinutes(totalBreak);

      const targetTimeMinutes = inTimeMinutes + workingMinutes - breakMinutes;

      const currentDate = new Date();
      const currentTimeMinutes =
        currentDate.getHours() * 60 + currentDate.getMinutes();

      const remainingMinutes = targetTimeMinutes - currentTimeMinutes;

      return Math.max(remainingMinutes, 0) * 60;
    } 
    else {
      return 0
    }
  }

  useEffect(() => {
    console.log("getLocalData", getLocalData);
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          console.log("Countdown reached zero!");
          setLaunch(true); // Trigger rocket launch animation
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const timer = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <div className=" text-center position-relative">
      <div className={` text-danger countdown ${launch ? "fade-out" : ""}`}>
        <div className="border p-2 d-inline-block">{timer}</div>
      </div>
      <h1 className="smoke">Rocket Launch Countdown</h1>
      {launch ? (
        <div className="rocket-div  ">
          <img
            src={rocketImage1}
            alt="rocket"
            className={`rocket  ${launch ? "launch" : ""}`}
          />
          {/* <img src={SmaokeImage}  className={`rocket`} /> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CountdownTimer;
