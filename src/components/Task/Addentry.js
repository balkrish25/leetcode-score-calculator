import React from "react";
import "./Addentry.css";
import { useState } from "react";
import Navigation from "../navigation/Navigation";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
//import { async } from "q";

export default function Addentry() {
  const navigate = useNavigate();
  const [ranking, setRanking] = useState();
  const [comment, setComment] = useState();
  const [easy, setEasy] = useState();
  const [medium, setMedium] = useState();
  const [hard, setHard] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  // const [data, addEntryData] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userName: username,
      week: weekOfYear,
      empId: user,
      leetRanking: ranking,
      easy: easy,
      medium: medium,
      hard: hard,
      year: 2023,
      wissenRanking: 0,
      comments: comment,
    };
    
    let res;
    try {
      res = await axios.post(`http://localhost:8080/user/addsubmission`, data);
      if (res.status === 201) {
        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 2000);
      } 
    } catch (error) {
      if (error.response.status === 400) {
        setShowError(true);
        setShowSuccess(false);
        console.log("Data already exists in the database.");
      } else {
        console.log("Error:", error.message);
      }
    }
    // const res1 = await res.data;
    // console.log(res1, "res1");
    
  };
  const handleCancel = () => {
    navigate("/home", { replace: true });
  };

  const user = localStorage.getItem("user");
  const username = localStorage.getItem("username").replace(/"/g, "");
console.log(username,"username");
  console.log(user);
  //console.log(user)
  // var d = new Date();
  // var date = d.getDate();
  // var day = d.getDay();
  // var weekOfMonth = Math.ceil((date - 1 - day) / 7) + 1;
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };
  var d = new Date();
  var weekOfYear = d.getWeek();

  return (
    <>
      <Navigation />
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          Submitted Successfully
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
         Data already exists for the current week.
        </Alert>
      )}

      <div className="add-entry-container">
        <div className="containerx">
          <div className="containery">
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-center text">Details</p>
                  <div className="details">
                    <label>Week</label>
                    <input
                      className="Addinput"
                      style={{
                        padding: "0.8rem",
                        border: "black 2px solid  rgb(39,37,37)",
                      }}
                      type={"text"}
                      disabled
                      value={weekOfYear}
                      placeholder="No of week"
                    />
                    <label>Ranking</label>
                    <input
                      className="Addinput"
                      style={{ padding: "0.8rem", borderRadius: "5px" }}
                      type="number"
                      placeholder=" Enter your Ranking"
                      value={ranking}
                      onChange={(e) => setRanking(e.target.value)}
                    />
                    <label className="week">comment</label>
                    <textarea
                      className="Addinput"
                      style={{
                        padding: "0.8rem",
                        borderRadius: "11px",
                        border: "black 2px solid ",
                        width: "60%",
                        height: "10%",
                      }}
                      // style={{ width: "40%",height:"60%" }}
                      placeholder="Write Something"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="text-center text">Complexity</p>
                  <div className="details">
                    <label>Easy</label>
                    <input
                      type="number"
                      className="Addinput"
                      style={{ padding: "0.8rem", borderRadius: "5px" }}
                      value={easy}
                      onChange={(e) => setEasy(e.target.value)}
                    />{" "}
                    <br />
                    <label>Medium</label>
                    <input
                      type="number"
                      className="Addinput"
                      style={{ padding: "0.8rem", borderRadius: "5px" }}
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                    />
                    <br />
                    <label>Hard</label>
                    <input
                      type="number"
                      className="Addinput"
                      style={{ padding: "0.8rem", borderRadius: "5px" }}
                      value={hard}
                      onChange={(e) => setHard(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger save-button  "
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary save-button  mx-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            </form>
          </div>
          <div className="application">
            <style>{"body { background-color: #f2f2f2; }"}</style>
          </div>
        </div>
      </div>
    </>
  );
}
