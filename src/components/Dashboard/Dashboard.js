import React from "react";
// import Chart from "react-apexcharts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Dcards from "./cards/Dcards"
import Rankhl from "../Reportdetails/Ranking.highest.lowest";
import MissingEntities from "./MissingEntities";
import { FcComboChart } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";
import './Dashtab.css'
import Navigation from "../navigation/Navigation";

function Dashboard() {
  return (
    <>
     <Navigation />
      <h1
        className="topheading"
        style={{
          color: "purple",
          fontFamily: "initial",
          fontStyle:"initial",
          fontSize: "x-large",
          marginLeft: "597px",
        
        }}
      >
        Dashboard
      </h1>
      <Tabs 
        defaultActiveKey="Missing Entries"
        id="fill-tab-example"
        className="default mb-3" style={{ backgroundColor: "lightgrey"}}
        fill
      >
        <Tab
          eventKey="Missing Entries"
          title={
            <span style={{fontFamily:"monospace"}}>
              <FcComboChart /> Missing Entry
            </span>
          }
        >
          <div className="tab-content">
            <MissingEntities />
          </div>
        </Tab>
        <Tab
          eventKey="Ranking &amp; Complexity"
          title={
            <span style={{fontFamily:"monospace"}}>
              <FcRating /> Rating &amp; Complexity
            </span>
          }
        >
          <div className="tab-content">
            <Dcards />
          </div>
        </Tab>
        <Tab
          eventKey="Highest &amp; Lowest"
          title={
            <span style={{fontFamily:"monospace"}}>
              <RxArrowUp />
              <RxArrowDown /> Highest &amp; Lowest
            </span>
          }
        >
          <div className="tab-content">
            <Rankhl/>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
export default Dashboard;
