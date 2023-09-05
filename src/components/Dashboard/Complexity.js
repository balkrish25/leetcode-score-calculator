import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Multiselect from "multiselect-react-dropdown";
import { Container } from "react-bootstrap";
import axios from "axios";

function Complexity() {
  const [empId, setEmpId] = useState([]);
  const [graphWeek, setGraphWeek] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const [userData, setUserData] = useState([]);
  const [graphEmp, setGraphEmp] = useState([]);
  const [graphEasy, setGraphEasy] = useState([]);
  const [graphMedium, setGraphMedium] = useState([]);
  const [graphHard, setGraphHard] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [weekDrop, setWeekDrop] = useState([]);
  const [weekDropDown, setWeekDropDown] = useState([]);

  // const [weekDrop, setWeekDrop] = useState([]);
  // const [weekDropDown, setWeekDropDown] = useState([]);

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };
  var d = new Date();
  var weekOfYear = d.getWeek();
  // var weekOfYear = 10;

  useEffect(() => {
    const getEmpId = async () => {
      const getempIdname = [];
      const reqData = await fetch("http://localhost:8080/user/allusers");
      const resData = await reqData.json();

      for (let i = 0; i < resData.length; i++) {
        getempIdname.push(resData[i].empId);
        // console.log(resData);
      }
      setEmpId(getempIdname);
      const getGraphWeek = [];
      for (let i = 1; i <= weekOfYear; i++) {
        getGraphWeek.push("week" + i);
      }
      
    };
    getEmpId();
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/user/complexity?empIds=${searchId.toString()}`
      )
      .then((res) => {
        const data = res.data;
        setUserData(data);
        console.log(userData, "result data");
      });

    // let emp_Ids = [];
    let empEasy = [];
    let empMedium = [];
    let empHard = [];

    searchId.map((id) => {
      let easy = null;
      let medium = null;
      let hard = null;

      userData.forEach((item) => {
        if (item.empId == id && item.week == weekOfYear) {
          easy = item.easy;
          medium = item.medium;
          hard = item.hard;
        }
      });

      empEasy.push(easy != null ? easy : 0);
      empMedium.push(medium != null ? medium : 0);
      empHard.push(hard != null ? hard : 0);
    });

    setGraphEasy(empEasy);
    setGraphMedium(empMedium);
    setGraphHard(empHard);
    // getGraphData()
  }, [searchId]);
  const handleUserSelect = (selectedList, selectedItem) => {
    setSearchId(selectedList);
  };

  const handleUserRemove = (selectedList, removedItem) => {
    setSearchId(selectedList);
  };

  // const handleWeekSelect = (selectedList, selectedItem) => {
  //   setWeekDropDown(selectedList);
  // };

  // const handleWeekRemove = (selectedList, removedItem) => {
  //   setWeekDropDown(selectedList);
  // };

  return (
    <div className="complex">
      {console.log("userData>>>>", userData)}

      <h5 style={{ marginBottom: "-28px", marginTop: "-28px",fontFamily:"system-ui" }}>Complexity</h5>

      {/*empid dropdown */}
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
                selectedValues={searchId}
                options={empId}
                placeholder="Emp Id "
                showCheckbox
              />
            </div>
          </div>
        </form>
      </Container>

      {/* week dropdown  */}
     
      
      {/* dropdown */}
      {/* graph */}
      <Chart
        type="bar"
        width={400}
        height={490}
        series={[
          {
            name: "Easy",
            data: graphEasy,
          },
          {
            name: "Medium",
            data: graphMedium,
          },
          {
            name: "Hard",
            data: graphHard,
          },
        ]}
        options={{
          title: { text: "" },
          colors: ["#ff0000", "#f0f", "dd0"],
          chart: {
            stacked: true,
          },
          xaxis: {
            categories: searchId,
          },
          tittle: {
            text: "No of Weeks",
            style: {
              color: "#f0f",
            },
          },
        }}
      ></Chart>
    </div>
  );
}
export default Complexity;
