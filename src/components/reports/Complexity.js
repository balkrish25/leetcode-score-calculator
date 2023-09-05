import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

function Complexity(props) {
  const { empDetails } = props;
  const filteredeasy = [];
  const filteredmedium = [];
  const filteredhard = [];
  console.log("filteredeasy", filteredeasy);
  console.log("filteredmedium", filteredmedium);
  console.log("filteredhard", filteredhard);
  const weeks = [];
  const year = moment().year();
  const currentWeek = moment().week();
  for (let i = 1; i <= currentWeek; i++) {
    const weekData = empDetails.find((element) => element.week === i) || {
      easy: 0,
      medium: 0,
      hard: 0,
    };
    weeks.push(`Week ${i}`);
    filteredeasy.push(weekData.easy);
    filteredmedium.push(weekData.medium);
    filteredhard.push(weekData.hard);
  }
  return (
    <div>
      <h5
        className="net"
        style={{
          color: "black",
          fontVariantCaps: "all-small-caps",
          textAlign: "center",
        }}
      >
        COMPLEXITY
      </h5>
      <header>
        <Chart
          type="line"
          width={400}
          height={450}
          series={[
            {
              name: "easy",
              data: filteredeasy,
            },
            {
              name: "Medium",
              data: filteredmedium,
            },
            {
              name: "Hard",
              data: filteredhard,
            },
          ]}
          options={{
            title: { text: "Problem based on complexity" },
            xaxis: {
              title: { text: "Week" },
              categories: weeks,
            },
            yaxis: {
              title: { text: "Rank" },
            },
          }}
        />
      </header>
    </div>
  );
}

export default Complexity;
