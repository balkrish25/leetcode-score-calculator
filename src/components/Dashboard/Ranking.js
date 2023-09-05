import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Multiselect from "multiselect-react-dropdown";
import { Container } from "react-bootstrap";
import axios from "axios";

function Ranking() {
  const [empId, setEmpId] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const [graphWeek, setGraphWeek] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [weekDrop, setWeekDrop] = useState([]);
  const [weekDropDown, setWeekDropDown] = useState([]);

  // let seriesData = [];
  const [graphSeriesData, setGraphSeriesData] = useState([]);

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };
  var d = new Date();
  var weekOfYear = d.getWeek();

  // multidropdown

  useEffect(() => {
    const getEmpId = async () => {
      const getempIdname = [];
      const week = [];
      const reqData = await fetch(`http://localhost:8080/user/allusers`);
      const resData = await reqData.json();

      console.log(resData);
      for (let i = 0; i < resData.length; i++) {
        getempIdname.push(resData[i].empId);
        // console.log(resData);
      }
      setEmpId(getempIdname);
      const getGraphWeek = [];
      for (let i = 1; i <= weekOfYear; i++) {
        getGraphWeek.push("week" + i);
        week.push(i);
      }

      setWeekDrop(week);
    };
    getEmpId();
  }, []);

  useEffect(() => {
    if (searchId.length > 0 && weekDropDown.length > 0) {
      // const empIds = ;
      // const weeks = ;
      axios
        .get(
          `http://localhost:8080/user/getselectedbyuserempids?empIds=${searchId.toString()}&weeks=${weekDropDown.toString()}`
        )
        .then((res) => {
          const data = res.data;
          console.log(data, "data");
          const sortedWeeks = weekDropDown.sort((a, b) => a - b);
          setGraphWeek(sortedWeeks);
          console.log(graphWeek, "sortedweeks");

          const seriesData = [];

          for (const user of searchId) {
            const userSeries = {
              name: user,
              data: [],
            };
            console.log(user, "user");
            const userWeek = data.filter((item) => item.empId == user);
            console.log(userWeek, "----");

            for (const week of sortedWeeks) {
              console.log(week);
              let userRanking = null;
              const selectedData = data.filter(
                (d) => (d.week == week) & (d.empId == user)
              );
              console.log(selectedData, "selectedData");
              if (selectedData.length > 0) {
                selectedData.filter((g) => (userRanking = g.leetRanking));
              }
              userSeries.data.push(userRanking == null ? 0 : userRanking);
            }
            seriesData.push(userSeries);
          }
          setGraphSeriesData(seriesData);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  }, [searchId, weekDropDown]);

  const handleUserSelect = (selectedList, selectedItem) => {
    setSearchId(selectedList);
  };

  const handleUserRemove = (selectedList, removedItem) => {
    setSearchId(selectedList);
  };

  const handleWeekSelect = (selectedList, selectedItem) => {
    setWeekDropDown(selectedList);
  };

  const handleWeekRemove = (selectedList, removedItem) => {
    setWeekDropDown(selectedList);
  };

  return (
    <React.Fragment>
      {console.log("seriesData>>>>", graphSeriesData)}
      {console.log("searchId>>>>", searchId)}
      {console.log(weekDropDown, "weekDropDown")}

      <div className="containera-fluid mt-3 mb-3">
        <h5
          style={{
            marginBottom: "-28px",
            marginTop: "-45px",
            fontFamily: "system-ui",
          }}
        >
          {" "}
          Ranking
        </h5>
        <div>
          <Container className="content" style={{}}>
            <form className="row g-3" method="post">
              <div className="col-md-5">
                <label className="form-label"></label>

                <div
                  className="text-dark"
                  style={{
                    width: "400px",
                    marginLeft: "00px",
                    border: "black 0.7px solid ",
                    borderRadius: "4px",
                    padding: "1px",
                    marginBottom: "-20px",
                  }}
                >
                  <Multiselect
                    isObject={false}
                    onSelect={handleUserSelect}
                    onRemove={handleUserRemove}
                    options={empId}
                    placeholder="Emp Id "
                    selectedValues={searchId}
                    showCheckbox
                  />
                </div>
              </div>
            </form>
          </Container>

          <Container className="content" style={{}}>
            <form className="row g-3" method="post">
              <div className="col-md-5">
                <label className="form-label"></label>

                <div
                  className="text-dark"
                  style={{
                    width: "400px",
                    marginLeft: "00px",
                    border: "black 0.7px solid ",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                >
                  <Multiselect
                    isObject={false}
                    onSelect={handleWeekSelect}
                    onRemove={handleWeekRemove}
                    options={weekDrop}
                    placeholder="week"
                    selectedValues={weekDropDown}
                    showCheckbox
                  />
                </div>
              </div>
            </form>
          </Container>
        </div>
        <Chart
          type="line"
          width={400}
          height={400}
          series={graphSeriesData}
          options={{
            title: { text: " " },
            xaxis: {
              categories: graphWeek,
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Ranking;
