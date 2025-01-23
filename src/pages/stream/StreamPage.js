import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import "../control/ControlButton.js";
import "../../css/StreamPage.css"; // Impor CSS untuk styling

function StreamPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamSrc, setStreamSrc] = useState(""); // Untuk menyimpan sumber stream

  const [relayStates, setRelayStates] = useState({
    relay3: false,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState({
    relay3: false,
  });

  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://growbot-1rwo5b.a02.usw2.aws.hivemq.cloud:8884/mqtt",
      {
        username: "RADZDuino",
        password: "Juaragemastik2024",
      }
    );

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  // Fungsi untuk memulai stream saat tombol play ditekan
  const handlePlay = () => {
    setStreamSrc("https://iot.ums.ac.id/laptop_cam");
    setIsPlaying(true);
  };

  // Fungsi untuk menghentikan stream saat tombol stop ditekan
  const handleStop = () => {
    setStreamSrc(""); // Hapus URL stream untuk menghentikan
    setIsPlaying(false);
  };

  const toggleRelay = (relayNumber) => {
    const newState = !relayStates[`relay${relayNumber}`];

    if (client && client.connected) {
      setIsButtonDisabled((prevState) => ({
        ...prevState,
        [`relay${relayNumber}`]: true,
      }));

      if (relayNumber === 3) {
        client.publish("sensor/bird", newState ? "ON" : "OFF");
        console.log("tombol sudah ditekan");
      }

      setRelayStates((prevState) => ({
        ...prevState,
        [`relay${relayNumber}`]: newState,
      }));

      setTimeout(() => {
        setIsButtonDisabled((prevState) => ({
          ...prevState,
          [`relay${relayNumber}`]: false,
        }));
      }, 5000);
    } else {
      console.error("MQTT client is not connected");
    }
  };

  return (
    <div className="stream-container">
      <h1 className="stream-title">Live Camera Stream</h1>

      {/* Tombol Play atau Stop tergantung status isPlaying */}
      {!isPlaying ? (
        <button className="play-button" onClick={handlePlay}>
          Play Stream
        </button>
      ) : (
        <button className="stop-button" onClick={handleStop}>
          Stop Stream
        </button>
      )}

      {/* Tombol untuk Relay 3 */}
      <div
        className={`custom-btn ${
          relayStates.relay3 ? "btn-danger" : "btn-success"
        }`}
        onClick={() => !isButtonDisabled.relay3 && toggleRelay(3)}
        style={{ pointerEvents: isButtonDisabled.relay3 ? "none" : "auto" }}
      >
        {relayStates.relay3 ? "Matikan Sirine" : "Hidupkan Sirine"}
      </div>

      {/* Stream Video akan muncul setelah tombol Play ditekan */}
      {isPlaying && (
        <div className="video-wrapper">
          <img
            className="video-player"
            alt="stream-burung"
            src={streamSrc}
            title="Live Stream"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></img>
        </div>
      )}
    </div>
  );
}

export default StreamPage;
