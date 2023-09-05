import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { IoMdTrophy } from "react-icons/io";
import "./Star.css";
import axios from "axios";

function Star() {
  const [toppersList, setToppersList] = useState([]);
  const [activeWeek, setActiveWeek] = useState(" ");
  const handleWeekClick = (index) => {
    setActiveWeek(index);
  };

  useEffect(() => {
    const getToppersList = async () => {
      const toppersList = await axios.get(
        `http://localhost:8080/user/topthree`
      );
      const data = await toppersList.data;
      setToppersList(data);
      setActiveWeek(Object.keys(data)[0]);
    };
    getToppersList();
  }, []);
  console.log("toppersList", toppersList);

  const getRating = (rank) => {
    switch (rank) {
      case 1:
        return <i style={{ color: "gold", fontWeight: "bold" }}>Gold</i>;
      case 2:
        return <i style={{ color: "silver", fontWeight: "bold" }}>Silver</i>;
      case 3:
        return <i style={{ color: "#cd7f32", fontWeight: "bold" }}>Bronze</i>;
      default:
        return "No Rating";
    }
  };
  const greetingMessage = `Congratulations top performers!`;

  return (
    <>
      <Navigation />
      <h1 className="greeting-message">{greetingMessage}</h1>
      <div className="cards one">
        <div className="header">
          <h3 style={{color:"black",fontFamily:"initial"}}> Weeks</h3>
          <div className="sort">
            {Object.keys(toppersList).map((key, index) => (
              <div
                key={key}
                className={`day ${key === activeWeek ? "active" : ""}`}
                onClick={() => handleWeekClick(key)}
              >
                {` ${key.split(" ")[1]}`}
              </div>
            ))}
          </div>
        </div>
        <div className="profile">
          {toppersList[activeWeek] &&
            toppersList[activeWeek].map((topper, index) => (
              <div
                key={index}
                className={`person ${
                  index === 0 ? "first" : index === 1 ? "second" : "third"
                }`}
              >
                {index === 0 ? (
                  <IoMdTrophy className="trophy gold" />
                ) : index === 1 ? (
                  <IoMdTrophy className="trophy silver" />
                ) : (
                  <IoMdTrophy className="trophy bronze" />
                )}
                <div className="num">{getRating(index + 1)}</div>
                <p className="link">{topper.userName}</p>
                <p className="points">{topper.leetRanking}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Star;
