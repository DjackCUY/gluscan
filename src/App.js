import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ChartPage from "./pages/chart/ChartPage";
import ControlButton from "./pages/control/ControlButton";
import SettingPage from "./pages/setting/SettingPage";
import StreamPage from "./pages/stream/StreamPage";
// import LoginPage from "./pages/login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/App.css"; // Import the CSS file
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
  const [sensorData1, setSensorData1] = useState("");
  const [sensorData2, setSensorData2] = useState("");
  const [sensorData3, setSensorData3] = useState("");
  const [sensorDataN, setSensorDataN] = useState("");
  const [sensorDataP, setSensorDataP] = useState("");
  const [sensorDataK, setSensorDataK] = useState("");

  // pengaturan navbar open & close
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://growbot-1rwo5b.a02.usw2.aws.hivemq.cloud:8884/mqtt",
      {
        username: "RADZDuino",
        password: "Juaragemastik2024",
      }
    );

    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      const topics = [
        "sensor/temperature",
        "sensor/humidity",
        "sensor/nitrogen",
        "sensor/phosphorous",
        "sensor/potassium",
        "sensor/moisture",
      ];

      topics.forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to ${topic}:`, err);
          }
        });
      });
    });

    client.on("message", (topic, message) => {
      switch (topic) {
        case "sensor/temperature":
          setSensorData1(message.toString());
          break;
        case "sensor/humidity":
          setSensorData2(message.toString());
          break;
        case "sensor/nitrogen":
          setSensorDataN(message.toString());
          break;
        case "sensor/phosphorous":
          setSensorDataP(message.toString());
          break;
        case "sensor/potassium":
          setSensorDataK(message.toString());
          break;
        case "sensor/moisture":
          setSensorData3(message.toString());
          break;
        default:
          break;
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <Router>
      <Navbar expand="lg" className="navbar-custom" expanded={navbarOpen}>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="gambar"
              src="/images/logo/logoums-text.png"
              style={{ width: "95px", height: "auto", marginRight: "10px" }}
            />
            <img
              alt="gambar"
              src="/images/logo.png"
              style={{ width: "100px", height: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                className="nav-link"
                onClick={closeNavbar}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/chart"
                className="nav-link"
                onClick={closeNavbar}
              >
                Chart
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/control"
                className="nav-link"
                onClick={closeNavbar}
              >
                Control Button
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/stream"
                className="nav-link"
                onClick={closeNavbar}
              >
                Stream Camera
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/setting"
                className="nav-link"
                onClick={closeNavbar}
              >
                Setting
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {/* button download */}
              <div className="d-flex unduh-div">
                <button className="unduh">
                  <a href="/apk/GrowBot.apk">Unduh Aplikasi GrowBot</a>
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/chart"
            element={
              <ChartPage
                sensorData1={sensorData1}
                sensorData2={sensorData2}
                sensorData3={sensorData3}
                sensorDataN={sensorDataN}
                sensorDataP={sensorDataP}
                sensorDataK={sensorDataK}
              />
            }
          />
          <Route path="/control" element={<ControlButton />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
