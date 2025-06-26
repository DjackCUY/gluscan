import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import mqtt from "mqtt";
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MQTT_BROKER = "wss://9bb714241f0940c98be99b31c2e310ed.s1.eu.hivemq.cloud:8884/mqtt";
const NODE_TOPICS = ["NODE_01/koordinat", "NODE_02/koordinat"];

function MapPage() {
const [devices, setDevices] = useState({});

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
        setDevices((prev) => ({
            ...prev,
            [topic]: { ...data, topic },
        }));
    } catch (e) {
        // Handle parsing error
        }
    });

    return () => client.end();
}, []);

    return (
    <div className="map-page-container">
        <div className="map-title">
        <h2>Peta Lokasi Terrasentry</h2>
    </div>
    <div className="map-card">
        <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        scrollWheelZoom={true}
        className="custom-map"
        >
        <TileLayer
            attribution=''
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.values(devices).map((device) => (
            <Marker key={device.topic} position={[device.lat, device.lng]}>
                <Popup>
                <b>{device.topic}</b>
                <br />
                Koordinat: {device.lat}, {device.lng}
                <br />
                Kelembapan: {device.kelembapan ?? "-"}
                <br />
                Suhu: {device.suhu ?? "-"}
                </Popup>
            </Marker>
        ))}
        </MapContainer>
    </div>
    </div>
);
}

export default MapPage;