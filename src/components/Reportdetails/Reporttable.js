import { AgGridReact } from 'ag-grid-react';
import React,{useEffect,useState} from 'react';

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
function Reporttable() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/user/allusers');
      const data = await res.json();
      setRowData(data);
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: 'ID', field: 'empId', width: "90px" },
    { headerName: 'empEmail', field: 'empEmail', width: "180px" },
    { headerName: 'User Name', field: 'userName', width: "120px" },
    { headerName: 'Week', field: 'week', width: "70px" },
    { headerName: 'Year', field: 'year', width: "70px" },
    { headerName: 'Rating', field: 'leetRanking', width: "80px", hide: selectedRadioButton !== "Rating" },
    { headerName: 'Easy', field: 'easy', width: "70px", hide: selectedRadioButton === "Rating" },
    { headerName: 'Medium', field: 'medium', width: "90px", hide: selectedRadioButton === "Rating" },
    { headerName: 'Hard', field: 'hard', width: "70px", hide: selectedRadioButton === "Rating" },

  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="ag-theme-alpine" style={{ height: 400,width:"700px" }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reporttable;

