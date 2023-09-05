import React, { useState, useEffect } from "react";
import "../Reportdetails/ReportMainpage.css";
import Multiselect from "multiselect-react-dropdown";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../navigation/Navigation";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from 'react-icons/ri'
import { FiDownload } from 'react-icons/fi'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'


function ReportMainpage() {
  const [empId, setEmpId] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRadioButton, setSelectedRadioButton] = useState([]);
  const [startWeek, setStartWeek] = useState(null);
  const [endWeek, setEndWeek] = useState(null);
  const [res1, setRes1] = useState();
  const [dataToExport, setDataToExport] = useState(false);
  const [rowData, setRowData] = useState();
  const [showColumns, setShowColumns] = useState({ Rating: true,Complexity: false });


  // exportToExcel

  const exportToExcel = (res1, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(res1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };

  //MultiSelectdropdown

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
    };
    getEmpId();
  }, []);

  // Radio button
  const handleRadioButtonChange = (event) => {
    setSelectedRadioButton(event.target.value);
  }


  const columnDefs = [
    { headerName: 'ID', field: 'empId', width: "70px", filter:'true'},
    { headerName: 'User Name', field: 'userName', width: "120px", filter: 'true' },
    { headerName: 'Week', field: 'week', width: "90px", filter: 'true' },
    // { headerName: 'Year', field: 'year', width: "70px" },
    { headerName: 'LeetRanking', field: 'leetRanking', width: "120px", hide: !showColumns.Rating },
    { headerName: 'Easy', field: 'easy', width: "70px", hide: !showColumns.Complexity },
    { headerName: 'Medium', field: 'medium', width: "90px", hide: !showColumns.Complexity },
    { headerName: 'Hard', field: 'hard', width: "70px", hide: !showColumns.Complexity },
    { headerName: 'EmpEmail', field: 'empEmail', width: "190px" },

  ];

  //  WeekNumber
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }


  // handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fromWeek = new Date(startWeek);
    const toWeek = new Date(endWeek);

    const convertedFromWeek = getWeekNumber(fromWeek);
    const convertedToWeek = getWeekNumber(toWeek);

    setRes1(res1);
    setRowData(res1)
    setDataToExport(true);

    let regobj = {
      selectedOption,
      convertedFromWeek,
      convertedToWeek,
    };
    console.log("Selected radio button :", selectedRadioButton);

    // Radio button
    setShowColumns({
      Rating: selectedRadioButton === "Rating",
      Complexity: selectedRadioButton === "Complexity"
    });
    
    console.log(regobj);

    fetch(
      `http://localhost:8080/user/getrankrecords?startWeek=${convertedFromWeek}&endWeek=${convertedToWeek}&empId=${selectedOption}`
    )
      .then((response) => response.json())
      .then((data) => setRes1(data));
    // const res1 = await res.json;
    // console.log(res1);

    console.log(res1);
  };


  return (
    // Multiselectdropdown
    <>
      <div className="Nav">
        {/* <img className="img3" alt="Wissen logo" src={img3} /> */}
        <Navigation />
        <h1 className="Report">Report</h1>
        <div className="Border-container1" style={{ justifyContent: "between", display: "flex" }}>
          <div className="Padding" style={{ padding: "2px", marginTop: "50px" }}>

            <div className="line"  >
              <React.Fragment>
                <Container className="content">
                  <form className="row g-3" method="post">
                    <div className="col-md-5">
                      <label className="form-label"></label>

                      <div className="text-dark" style={{ width: "320px", backgroundColor: "white" }}>
                        <Multiselect isObject={false} onRemove={(event) => {
                          console.log(event);
                        }}
                          onSelect={(event) => {
                            setSelectedOption(event);
                          }}
                          onSearch={(event) => {
                            console.log(event);
                          }}
                          options={empId}
                          placeholder="Emp Id "
                          showCheckbox
                          value={empId}
                          onChange={(e) => setEmpId(e.target.value)}

                        />
                      </div>
                    </div>
                  </form>
                </Container>
              </React.Fragment>

              {/* calender multidatepicker */}

              <div className="Multidate">
                <form>
                  <label
                    className="Calender_Label"
                    style={{ color: "black", fontFamily: "italic" }}
                    htmlFor="start-date"
                  >
                    From week:
                  </label>
                  <div className="DatePicker" style={{ border: "black 0.1px solid", borderRadius: "3px" }}>

                    <DatePicker
                      selected={startWeek}
                      onChange={(date) => setStartWeek(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/MM/yyyy"
                      id="start-date"

                    />

                  </div>
                  <label
                    className="Calender_Label"
                    style={{ color: "black", fontFamily: "italic" }}
                    htmlFor="end-date"
                  >
                    To week:
                  </label>
                  <div className="DatePicker" style={{ border: "black 0.1px solid", borderRadius: "3px" }}>
                    <DatePicker className="Date" style={{ border: "solid 100px" }}
                      selected={endWeek}
                      onChange={(date) => setEndWeek(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/MM/yyyy"
                      id="end-date"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Radio Buttons */}

            <div className="Radio">
              <div>
                <input
                  className="Radio_Input"
                  style={{ border: "10px" }}
                  type="radio"
                  id="Rating"
                  name="radio-button"
                  value="Rating"
                  checked={selectedRadioButton === 'Rating'} onChange={handleRadioButtonChange}
                />
                <label className="Radio_label" htmlFor="Rating">
                  Rating
                </label>
              </div>
              <div className="Radio-2" style={{ marginLeft: "20px" }}>
                <input
                  className="Radio_Input"
                  type="radio"
                  id="Complexity"
                  name="radio-button"
                  value="Complexity"
                  checked={selectedRadioButton === 'Complexity'} onChange={handleRadioButtonChange}
                />
                <label className="Radio_label" htmlFor="Complexity">
                  Complexity{" "}
                </label>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: " 100px", marginLeft: " 460px" }} onClick={handleSubmit}>Search</button>
          </div>

          <div className="Export-divide" >
            <div className="containerZ">
              <div className="row">
                <div className="col-md-12">
                  <div className="ag-theme-alpine" style={{ height: 400, marginLeft: "-40px", width: "670px", marginTop: "-47px", }}>
                    {res1 && (<h4 className="Emp-det" style={{ fontsize: "100px", fontFamily: "kalam" }}>Employee Reports</h4>)}
                    {res1 && (

                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={res1}
                      //  pagination={true}
                      //  paginationPageSize={10}
                      />)}
                  </div>
                </div>
              </div>
            </div>

            {/* export execl button */}
            
            {res1 && dataToExport ? (
              <button className="btn btn-primary" onClick={() => exportToExcel(res1, "MyTable")} style={{ backgroundColor: "#3b5998;", border: "none", marginLeft: "560px", marginBottom: "-100px" }}>
                <RiFileExcel2Fill size={20} color={"black"} /> <FiDownload size={10} color={"black"} />
              </button>
            ) : null}
          </div> 
        </div>
      </div>

    </>
  );
}
export default ReportMainpage;

