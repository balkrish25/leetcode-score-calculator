import React from "react";

import Chart from "react-apexcharts";
import moment from "moment";

function Reports(props) {
  const { empDetails } = props;
  const filteredLeetRank = [];
  console.log("filteredLeetRank", filteredLeetRank);
  const weeks = [];
  const year = moment().year();
  const currentWeek = moment().week();
  for (let i = 1; i <= currentWeek; i++) {
    const weekData = empDetails.find((element) => element.week === i) || {
      leetRanking: 0,
    };
    weeks.push(`Week ${i}`);
    filteredLeetRank.push(weekData.leetRanking);
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
        RANK
      </h5>
      <header>
        <Chart
          type="line"
          width={400}
          height={450}
          series={[
            {
              name: "Rank",
              data: filteredLeetRank,
            },
          ]}
          options={{
            title: { text: "Ranking based on week" },
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
export default Reports;
