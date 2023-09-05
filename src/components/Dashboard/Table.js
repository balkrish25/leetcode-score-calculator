import React, { useEffect, useState,useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


const Table = (props) => {
  const { users } = props;
  console.log(users, "users");
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "empid"  },
    { field: "email" },
    { field: "username" },
    { field: "missedWeek" },
    { field: "year" },
  ]);
  useEffect(() => {
    if (users) {
      const initialState = users.map((item) => ({
        empid: item.empId,
        email: item.empEmail,
        username: item.userName,
        missedWeek: item.missedWeek,
        year: item.missedYear,
      }));
      setRowData(initialState);
    }
  }, [users]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      // cellStyle: { marginLeft: "0px" },
   
    };
  }, []);

  return (
    <div className="tablehead">
      <h3 style={{fontFamily:"itallic",marginLeft:"570px"}}>Missed-Details</h3>
      <div
        className="ag-theme-alpine"
        style={{ height: 300, width: 1000, marginLeft: 170 ,marginBottom:30}}
      >
        <AgGridReact 
        rowData={rowData} 
        columnDefs={columnDefs}
        alwaysShowHorizontalScroll={true}
        alwaysShowVerticalScroll={true}
        defaultColDef={defaultColDef}
        >

        </AgGridReact>
      </div>
    </div>
  );
};
export default Table;
