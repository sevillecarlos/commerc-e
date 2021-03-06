import React, { useState, useEffect } from "react";
import { MdWatchLater, MdDateRange } from "react-icons/md";
import { formatTime } from "../helper/formatTime";
import "./style/NavBarWatch.css";
const Watch = () => {
  const [timeInfo, setTimeInfo] = useState("");
  const [dateInfo, setDateInfo] = useState("");

  useEffect(() => {
    const timeInterval = setInterval(clock, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  });
  const clock = () => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const second = now.getSeconds();
    setTimeInfo(`${formatTime(hour)}:${formatTime(min)}:${formatTime(second)}`);
    setDateInfo(now.toDateString());
  };

  return (
    <div className="date-time">
      <h5>
        <MdWatchLater /> {timeInfo}
      </h5>
      <h5>
        <MdDateRange />
        {dateInfo}
      </h5>
    </div>
  );
};

export default Watch;
