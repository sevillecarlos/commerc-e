import React, { useState, useEffect } from "react";
import "./style/NavBarWatch.css"
const Watch = () => {
  const [timeInfo, setTimeInfo] = useState("");
  const [dateInfo, setDateInfo] = useState("");

  useEffect(() => {
    updateTimeDate();
  }, []);
  const updateTimeDate = () => {
    setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const second = now.getSeconds();
      const date = now.getDate();
      const month = now.getMonth();
      const year = now.getFullYear();
      setTimeInfo(`${hour}:${min}:${second}`);
      setDateInfo(`${date}/${month}/${year}`);
    }, 1000);
  };

  return (
    <div className="date-time">
      <h5>{timeInfo}</h5>
      <h5>{dateInfo}</h5>
    </div>
  );
};

export default Watch;
