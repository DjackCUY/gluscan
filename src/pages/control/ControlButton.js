import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import "../../css/ControlButton.css";

function ControlButton() {
  const [relayStates, setRelayStates] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });

  // total jumlah air
  const [totalAir, setTotalAir] = useState(0);

  // menentukan batas air dan pupuk
  const [batasAir, setBatasAir] = useState(300);
  const [batasPupuk, setBatasPupuk] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  // State untuk menyimpan client MQTT
  const [client, setClient] = useState(null);

  // State untuk mengontrol tombol disable
  const [isButtonDisabled, setIsButtonDisabled] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://growbot-1rwo5b.a02.usw2.aws.hivemq.cloud:8884/mqtt",
      {
        username: "RADZDuino",
        password: "Juaragemastik2024",
      }
    );

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("sensor/flow", (err) => {
        if (!err) {
          console.log("subscribe to sensor/flow");
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      if (topic === "sensor/flow") {
        setTotalAir(message.toString());
      }
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const handleBatasAir = (event) => {
    setBatasAir(event.target.value);
  };

  const handleBatasPupuk = (event) => {
    setBatasPupuk(event.target.value);
  };

  const handleSaveAir = () => {
    if (client && client.connected) {
      console.log(`Batas Air ${batasAir}`);

      // Publish batas air value to the topic
      client.publish("data/air", batasAir.toString(), (err) => {
        if (err) {
          console.error("Failed to send data:", err);
          setErrorMessage("Failed to send data to MQTT broker");
        } else {
          console.log("Data sent to MQTT broker:", batasAir);
          setErrorMessage(""); // Reset error message jika berhasil
        }
      });
    } else {
      console.error("MQTT client is not connected");
      setErrorMessage("MQTT client is not connected");
    }
  };
  const handleSavePupuk = () => {
    if (client && client.connected) {
      console.log(`Batas Air ${batasPupuk}`);

      // Publish batas air value to the topic
      client.publish("data/pupuk", batasPupuk.toString(), (err) => {
        if (err) {
          console.error("Failed to send data:", err);
          setErrorMessage("Failed to send data to MQTT broker");
        } else {
          console.log("Data sent to MQTT broker:", batasPupuk);
          setErrorMessage(""); // Reset error message jika berhasil
        }
      });
    } else {
      console.error("MQTT client is not connected");
      setErrorMessage("MQTT client is not connected");
    }
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
      }

      // Publish pesan ON/OFF ke topic yang sesuai
      client.publish(`sensor/relay${relayNumber}`, newState ? "ON" : "OFF");

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
    <div>
      <h1 className="ctrl-btn">Control Relays</h1>
      <div className="container-utama">
        <div className="row">
          {/* Tombol untuk Relay 1 */}
          <div
            className={`custom-btn ${
              relayStates.relay1 ? "btn-danger" : "btn-success"
            }`}
            onClick={() => !isButtonDisabled.relay1 && toggleRelay(1)}
            style={{ pointerEvents: isButtonDisabled.relay1 ? "none" : "auto" }}
          >
            {relayStates.relay1
              ? "Matikan Pompa Pupuk"
              : "Hidupkan Pompa Pupuk"}
          </div>

          {/* Tombol untuk Relay 2 */}
          <div
            className={`custom-btn ${
              relayStates.relay2 ? "btn-danger" : "btn-success"
            }`}
            onClick={() => !isButtonDisabled.relay2 && toggleRelay(2)}
            style={{ pointerEvents: isButtonDisabled.relay2 ? "none" : "auto" }}
          >
            {relayStates.relay2 ? "Matikan Pompa Air" : "Hidupkan Pompa Air"}
          </div>

          {/* Tombol untuk Relay 3 */}
          {/* <div
            className={`custom-btn ${
              relayStates.relay3 ? "btn-danger" : "btn-success"
            }`}
            onClick={() => !isButtonDisabled.relay3 && toggleRelay(3)}
            style={{ pointerEvents: isButtonDisabled.relay3 ? "none" : "auto" }}
          >
            {relayStates.relay3 ? "Matikan Sirine" : "Hidupkan Sirine"}
          </div> */}
        </div>
      </div>
      {/* menampilkan total air */}
      <div className="totalAir">
        <p> Total air yang dialirkan : {totalAir}ml </p>
      </div>
      <hr></hr>
      {/* mengatur keluarnya air dan pupuk */}
      <div className="row d-flex justify-content-center settings">
        <div className="col-6 pupuk">
          <label htmlFor="batasPupuk" className="form-label">
            Batas pupuk :
          </label>
          <input
            id="batasPupuk"
            type="number"
            value={batasPupuk}
            onChange={handleBatasPupuk}
            className="form-control"
            min="0"
            max="100"
          />

          <button onClick={handleSavePupuk} className="btn-pupuk">
            Save Settings
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="col-6 air">
          <label htmlFor="batasAir" className="form-label">
            Batas air :
          </label>
          <input
            id="batasAir"
            type="number"
            value={batasAir}
            onChange={handleBatasAir}
            className="form-control"
            min="0"
            max="100"
          />

          <button onClick={handleSaveAir} className="btn-air">
            Save Settings
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default ControlButton;
