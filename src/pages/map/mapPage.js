import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

const iconModern = (color) =>
  new L.Icon({
    iconUrl:
      color === "green"
        ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        : color === "yellow"
        ? "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        : color === "red"
        ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const iconCache = {};
function getIconByCondition(condition) {
  let color = "green";
  if (condition === "⚠️ Peringatan") color = "yellow";
  if (condition === "💀 Bahaya") color = "red";
  if (!iconCache[color]) {
    iconCache[color] = iconModern(color);
  }
  return iconCache[color];
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
                  <b>#{device.deviceId}</b>
                  <br />
                  <br />
                  <b>Koordinat:</b> {device.lat}, {device.long}
                  <br />
                  <b>Kondisi:</b> {device.kondisi ?? "-"}
                  <br />
                  <b>Updated:</b> {device.lastUpdate ? new Date(device.lastUpdate).toLocaleTimeString() : "-"}
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