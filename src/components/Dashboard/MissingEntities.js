import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Table from "./Table";
import axios from "axios";


function Missingentities() {
  const [users, setUsers] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphWeek, setGraphWeek] = useState([]);
  const [graphWeekCount, setGraphWeekCount] = useState([]);

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };
  var d = new Date();
  var weekOfYear = d.getWeek();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/allmissedentriessorted`)
      .then((res) => {
        let data = res.data;
        setUsers(data);
        const graphDataCurrent = [];
        const getGraphWeek = [];
        const graphWeekCount = [];

        for (let i = 1; i <= weekOfYear; i++) {
          let filteredMissing =
            data && data.filter((element, index) => element.missedWeek === i);
          graphDataCurrent.push(filteredMissing.length);
          getGraphWeek.push("week " + i);
          graphWeekCount.push(i);
        }
        // console.log("getGraphWeek", getGraphWeek);
        // console.log("MIssing data", graphDataCurrent);
        setGraphWeek(getGraphWeek);
        setGraphData(graphDataCurrent);
        setGraphWeekCount(graphWeekCount);
      });
  }, []);

  const tooltipContent = ({ series, seriesIndex, dataPointIndex, w }) => {
    const week = graphWeekCount[dataPointIndex];
const graphCount = graphData[dataPointIndex];
    const usersMissingWeek = users.filter((user) => user.missedWeek == week);
    console.log(usersMissingWeek, "usersMissingWeek");
    const usersList =
      users && usersMissingWeek.map((user) => `<div>(${user.empId}):${user.userName} </div>`);
      const weekStyles = {
        color: 'red',
      };

    return `<div  className="dashboard-week">Week ${week}</div>
    <div className="graph missed-counting">Missing Count: ${graphCount}</div>        
    <div className="dash-user">${usersList}</div>`;
  };

  return (
    <>
      <div className="missing"  >
        <div className="row">
          <div className="col-4">
            <Chart
              options={{
                chart: {
                  type: "line",

                  height: 350,
                },
                // stroke: {
                //   curve: 'stepline',
                // },
                xaxis: {
                  categories: graphWeek,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
                tooltip: {
                  custom: tooltipContent,
                },
              }}
              series={[
                {
                  name: "Missing Count",
                  data: graphData,
                  title: {
                    text: "Missing Count",
                  },
                },
              ]}
              type="line"
              width="1000"
              height="400"
              style={{
                marginLeft: "170px",
                border: "2px solid #ddd",
                width: "230%",
                borderColor: "purple",
                backgroundColor: "white",
                marginBottom: "20px",
              }}
            />
          </div>
        </div>
        <Table users={users} />
      </div>
    </>
  );
}
export default Missingentities;
