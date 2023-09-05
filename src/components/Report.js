import React from "react";
import Chart from "react-apexcharts";
import Navigation from "./navigation/Navigation";

function Report() {
  return (
    <>
      <Navigation />
      <React.Fragment>
        <h2
          style={{ color: "Purple", marginLeft: "100px", fontFamily: "italic" }}
        >
          {" "}
          Ranking Highest and Lowest
        </h2>
        <div className="" style={{ marginLeft: "200px" }}>
          <Chart
            type="line"
            width={500}
            height={500}
            series={[
              {
                name: "Emp 1",
                data: [1, 10, 54, 56, 60, 45],
              },
              {
                name: "Emp 2",
                data: [10, 11, 41, 20, 7, 90],
              },
            ]}
            options={{
              title: { text: "Ranking " },
              xaxis: {
                title: { text: "Week" },
                categories: ["1", "2", "3", "4", "5", "6", "7"],
              },
            }}
          ></Chart>
        </div>
      </React.Fragment>
    </>
  );
}
export default Report;
