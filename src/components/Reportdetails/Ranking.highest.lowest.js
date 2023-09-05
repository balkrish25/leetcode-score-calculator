import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ReactDOMServer from 'react-dom/server';

function Rankhl() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`http://localhost:8080/user/toplast`);
      setUserDetails(response.data);
    }
    getData();
  }, []);

  console.log(userDetails);

  const graphWeeks = [];
  const maxRanks = [];
  const minRanks = [];
  const maxRankEmpId = [];
  const minRankEmpId = [];

  Object.keys(userDetails).forEach((key) => {
    console.log(userDetails, "userDetails");
    graphWeeks.push(key);

    const array = userDetails[key];
    minRanks.push(array[0].leetRanking);
    maxRanks.push(array[array.length - 1].leetRanking);
    maxRankEmpId.push(array[0].empId);
    minRankEmpId.push(array[array.length - 1].empId);
  });

  console.log(graphWeeks);
  console.log(maxRanks);
  console.log(minRanks);
  console.log(maxRankEmpId);
  console.log(minRankEmpId);

  const tooltipContent = ({ series, seriesIndex, dataPointIndex }) => {
    const week = graphWeeks[dataPointIndex];
    const empIdHigh = maxRankEmpId[dataPointIndex];
    const empIdLow = minRankEmpId[dataPointIndex];

    const rankLow = series[1][dataPointIndex];
    const rankHigh = series[0][dataPointIndex];

    const userHigh = userDetails[week].find((user) => user.empId === empIdHigh);
    const userLow = userDetails[week].find((user) => user.empId === empIdLow);

    const highestIcon = ReactDOMServer.renderToString(<FaArrowUp color="#2c6e49"/>);
    const lowestIcon = ReactDOMServer.renderToString(<FaArrowDown color="#f94144" />);
    // console.log(series[seriesIndex].leetRanking);
    return `
  <div class="apexcharts-tooltip-title">${week}</div>
  <div>${userHigh.userName}  (${empIdHigh}) ${highestIcon} ${rankHigh}</div>
  <div>${userLow.userName} (${empIdLow}) ${lowestIcon}  ${rankLow}</div>
    `;
  };

  return (
    <React.Fragment>
      <h4 className="Ranking" style={{padding:"10px", marginLeft: "300px",fontFamily:"-webkit-body"}}>  Ranking (Highest&Lowest)</h4>
      <div className="container-Rank">
        <Chart
          type="line"
          width={500}
          height={500}
          style={{
            marginLeft: "300px",
            border: "2px solid black",
            width: "fit-content", }}

          series={[
            {
              name: "Lowest",
              data: minRanks,
              color: "#f94144",
            },
            {
              name: "Highest",
              data: maxRanks,
              color: "#2c6e49",
            },
          ]}
          options={{
            title: { text: "Ranking " },
            xaxis: {
              title: { text: "Week" },
              categories: graphWeeks,
            },
            tooltip: {
              custom: tooltipContent,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Rankhl;
