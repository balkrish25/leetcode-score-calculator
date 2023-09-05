import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { CgProfile } from "react-icons/cg";
import { Dropdown } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";

function Navigation() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    navigate("/");
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h4>Welcome</h4>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <ul className="navlink">
                <Link to="/home">
                  <li className="underline">
                    <span>
                      {" "}
                      <FaHome /> Home{" "}
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard">
                  <li className="underline">
                    {" "}
                    <span>
                      {" "}
                      <RiDashboardFill /> Dashboard
                    </span>
                  </li>
                </Link>
                <Link to="/Report">
                  <li className="underline">
                    {" "}
                    <span>
                      {" "}
                      <TbReport /> Report{" "}
                    </span>
                  </li>
                </Link>
                <Link to="/star">
                  <li className="underline">
                    {" "}
                    <span>
                      {" "}
                      <AiFillStar /> Stars{" "}
                    </span>
                  </li>
                </Link>
              </ul>
              <Offcanvas.Body></Offcanvas.Body>
            </Navbar.Offcanvas>
            <Link to="/home">
              <li className="underline">
                <Navbar.Brand
                  id="brand-name"
                  href="#"
                  style={{
                    color: "#fff",
                    fontSize: "28px",
                  }}
                >
                  LEADERBOARD
                </Navbar.Brand>
              </li>
            </Link>
            <li className="brand-underline">
              <img
                src="https://hrmax.myadrenalin.com/Adrenalin/iengine/images/WISSEN_YourLogo.png"
                width="150px"
                alt="brand-logo"
              />
            </li>
            <Dropdown>
              <li className="profile" onClick={handleMenuToggle}>
                <Dropdown.Toggle variant="" id="profile-dropdown">
                  <CgProfile
                    style={{ width: "35px", height: "35px", color: "#fff" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item href="#"> <li className="underline">Profile</li></Dropdown.Item> */}
                  <Dropdown.Item href="#">
                    <li className="logout" onClick={logoutHandler}>
                      Logout
                    </li>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </li>
            </Dropdown>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default Navigation;
