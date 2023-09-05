import React, { useEffect, useState } from "react";
import Reports from "./Reports";
import Complexity from "./Complexity";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Cards({ userId }) {
  const [empDetails, setEmpDetails] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`http://localhost:8080/user/${userId}`);
      setEmpDetails(response.data);
    }
    getData();
  }, [userId]);

  return (
    <div>
      <h3
        className="py-3 Head"
        style={{
          color: "black",
          marginLeft: "600px",
          fontVariantCaps: "all-small-caps",
          fontFamily:"initial"
        }}
      >
        Weekly Report
      </h3>
      <Link to="/addentry">
        <Button style={{ marginLeft: "1239px", position: "absolute" }}>
          Add Data
        </Button>
      </Link>
      <div
        className="wissen"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div class="card  col-md-4">
          <div class="card-body">
            <Reports empDetails={empDetails} />
          </div>
        </div>
        <div class="card col-md-4">
          <div class="card-body">
            <Complexity empDetails={empDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cards;
