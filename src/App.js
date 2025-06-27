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
import SettingPage from "./pages/setting/SettingPage";
import MapPage from "./pages/map/mapPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/App.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const MQTT_BROKER = "wss://9bb714241f0940c98be99b31c2e310ed.s1.eu.hivemq.cloud:8884/mqtt";
const NODE_TOPICS = ["TERRA-1", "TERRA-2", "TERRA-3"]; // ganti sesuai topik device Anda

function App() {
  const [sensorDataNodes, setSensorDataNodes] = useState({});
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER, {
      username: "terrasentry",
      password: "Indrakenz1.",
    });

    client.on("connect", () => {
      NODE_TOPICS.forEach((topic) => client.subscribe(topic));
    });

    client.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        setSensorDataNodes((prev) => {
          const now = Date.now();
          // Filter node yang masih aktif (<30 detik)
          const filtered = Object.entries(prev)
            .filter(([_, d]) => now - (d.lastUpdate || 0) < 30000)
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
          return {
            ...filtered,
            [data.deviceId || topic]: { ...data, topic, lastUpdate: now },
          };
        });
      } catch (e) {
        // Handle parsing error
      }
    });

    return () => client.end();
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
              <Nav.Link as={NavLink} to="/" className="nav-link" onClick={closeNavbar}>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/chart" className="nav-link" onClick={closeNavbar}>Chart</Nav.Link>
              <Nav.Link as={NavLink} to="/map" className="nav-link" onClick={closeNavbar}>Map</Nav.Link>
              <Nav.Link as={NavLink} to="/setting" className="nav-link" onClick={closeNavbar}>Settings</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
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
          <Route path="/chart" element={<ChartPage sensorDataNodes={sensorDataNodes} />} />
          <Route path="/map" element={<MapPage sensorDataNodes={sensorDataNodes} />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;