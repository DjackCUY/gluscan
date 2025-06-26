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
import MapPage from "./pages/map/mapPage";
import StreamPage from "./pages/stream/StreamPage";
// import LoginPage from "./pages/login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/App.css"; // Import the CSS file
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
  const [sensorDataAkselerometer, setsensorDataAkselerometer] = useState("");
  const [sensorData2, setSensorData2] = useState("");
  const [sensorData3, setSensorData3] = useState("");
  const [sensorData4, setSensorData4] = useState("");
  const [sensorDataKelembapanT, setsensorDataKelembapanT] = useState("");

  // pengaturan navbar open & close
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://9bb714241f0940c98be99b31c2e310ed.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "terrasentry",
        password: "Indrakenz1.",
      }
    );

    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      const topics = [
        "sensor/akselerometer",
        "sensor/giroskop",
        "sensor/kelembapanT",
        "sensor/kelembapanU",
        "sensor/suhu"
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
        case "sensor/akselerometer":
          setsensorDataAkselerometer(message.toString());
          break;
        case "sensor/giroskop":
          setSensorData2(message.toString());
          break;
        case "sensor/kelembapanT":
          setsensorDataKelembapanT(message.toString());
          break;
        case "sensor/kelembapanU":
          setSensorData3(message.toString());
          break;
        case "sensor/suhu":
          setSensorData4(message.toString());
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
              src="/images/favicon.jpg"
              style={{ width: "50px", height: "auto", marginRight: "10px" }}
            />
            <img
              alt="gambar"
              src="/images/terra.png"
              style={{ width: "150px", height: "auto" }}
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
              to="/map"
              className="nav-link"
              onClick={closeNavbar}
            >
              Map
            </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/setting"
                className="nav-link"
                onClick={closeNavbar}
              >
                Settings
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {/* button download */}
              <div className="d-flex unduh-div">
                <button className="unduh">
                  <a href="/apk/Terrasentry.apk">Unduh Aplikasi Terrasentry</a>
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
                sensorDataAkselerometer={sensorDataAkselerometer}
                sensorData2={sensorData2}
                sensorData3={sensorData3}
                sensorData4={sensorData4}
                sensorDataKelembapanT={sensorDataKelembapanT}
              />
            }
          />
          <Route path="/control" element={<ControlButton />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
