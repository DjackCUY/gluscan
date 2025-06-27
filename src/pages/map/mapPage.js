import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

const iconModern = (color) =>
  new L.Icon({
    iconUrl: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/location-dot.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: `marker-${color}`,
  });

function getIconByCondition(condition) {
  if (condition === "normal") return iconModern("green");
  if (condition === "peringatan") return iconModern("yellow");
  if (condition === "bahaya") return iconModern("red");
  return iconModern("green");
}

function MapPage({ sensorDataNodes }) {
  const [now, setNow] = useState(Date.now());

  // Update waktu setiap detik agar marker bisa hilang otomatis
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter device yang masih aktif (<30 detik)
  const activeDevices = Object.values(sensorDataNodes || {}).filter(
    (device) => now - (device.lastUpdate || 0) < 1000
  );

  return (
    <div className="map-page-container">
      <div className="map-card">
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          scrollWheelZoom={true}
          className="custom-map"
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {activeDevices.map((device) =>
            device.lat && device.long ? (
              <Marker
                key={device.deviceId || device.topic}
                position={[device.lat, device.long]}
                icon={getIconByCondition(device.kondisi)}
              >
                <Popup>
                  <b>{device.topic || device.deviceId}</b>
                  <br />
                  Koordinat: {device.lat}, {device.long}
                  <br />
                  Soil: {device.moisture ?? "-"}
                  <br />
                  Humidity: {device.humidity ?? "-"}
                  <br />
                  Temperature: {device.temperature ?? "-"}
                  <br />
                  Gyro: {device.gyro ?? "-"}
                  <br />
                  Acc: {device.acc ?? "-"}
                  <br />
                  Updated: {device.lastUpdate ? new Date(device.lastUpdate).toLocaleTimeString() : "-"}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;