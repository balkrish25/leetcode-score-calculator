import React  from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import './App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Star from "./components/star/Star.js"
import Home from "./components/home/Home.js"
import Addentry from "./components/Task/Addentry";
import Tittle from "./components/Task/Tittle"
import Dashboard from "./components/Dashboard/Dashboard";
import Dcards from "./components/Dashboard/cards/Dcards";
import Table from "./components/Dashboard/Table";
// import Reportcard from "./components/Reportdetails/Reportcard"
import ReportMainpage from"./components/Reportdetails/Report.Mainpage"


function App() {
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/star" element={<Star />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addentry" element={<Addentry />} />
          <Route path="/tittle" element={<Tittle />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Table" element={<Table />} />
          <Route path="/Dcards" element={<Dcards />} />
          {/* <Route path="/Report" element={<Reportcard/>} />  */}
          <Route path="/Report" element={<ReportMainpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
  }

  
export default App;
