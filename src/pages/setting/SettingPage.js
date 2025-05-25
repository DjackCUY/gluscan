import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import "../../css/SettingPage.css";

function SettingPage() {
  const [plantType, setPlantType] = useState("Tomato");
  const [moistureThreshold, setMoistureThreshold] = useState(50);
  const [client, setClient] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const plantMoistureMapping = {
    Tomat: 40,
    Padi: 50,
    Jagung: 35,
    Kedelai: 30,
    Kopi: 45,
    Tebu: 50,
    Cabai: 45,
    "Sayuran Daun": 50,
    Kentang: 40,
    Tembakau: 30,
    "Kacang-kacangan": 35,
    Terong: 40,
  };

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://9bb714241f0940c98be99b31c2e310ed.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "terrasentry",
        password: "Indrakenz1.",
      }
    );

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setErrorMessage(""); // Reset error ketika terhubung
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
      setErrorMessage("Failed to connect to MQTT broker");
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const handlePlantTypeChange = (event) => {
    const selectedPlant = event.target.value;
    setPlantType(selectedPlant);

    if (plantMoistureMapping[selectedPlant]) {
      setMoistureThreshold(plantMoistureMapping[selectedPlant]);
    }
  };

  const handleMoistureThresholdChange = (event) => {
    setMoistureThreshold(event.target.value);
  };

  const handleSave = () => {
    if (client && client.connected) {
      console.log(`Moisture Threshold: ${moistureThreshold}`);

      // Publish moistureThreshold value to the topic
      client.publish("data/soil", moistureThreshold.toString(), (err) => {
        if (err) {
          console.error("Failed to send data:", err);
          setErrorMessage("Failed to send data to MQTT broker");
        } else {
          console.log("Data sent to MQTT broker:", moistureThreshold);
          setErrorMessage(""); // Reset error message jika berhasil
        }
      });
    } else {
      console.error("MQTT client is not connected");
      setErrorMessage("MQTT client is not connected");
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title text-center">
        Penyesuaian Sensitifitas Sensor
      </h1>
      <div className="settings-container2 row">
        <div className="settings-form col-6">
          <label htmlFor="plantType" className="form-label">
            Pilih Jenis Sensor :
          </label>
          <select
            id="plantType"
            value={plantType}
            onChange={handlePlantTypeChange}
            className="form-select"
          >
            <option value="akse">Akselerometer</option>
            <option value="giro">Giroskop</option>
            <option value="kelemT">Kelembapan Tanah</option>
            <option value="kelemU">Kelembapan Udara</option>
            {/* Tambahkan lebih banyak jenis tanaman jika diperlukan */}
          </select>

          <label htmlFor="moistureThreshold" className="form-label">
            Threshold / Batasan:
          </label>
          <input
            id="moistureThreshold"
            type="number"
            value={moistureThreshold}
            onChange={handleMoistureThresholdChange}
            className="form-control"
            min="0"
            max="100"
          />

          <button onClick={handleSave} className="btn mt-3">
            Save Settings
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        {/* <div className="information col-6">
          <p className="info-kelembaban">Klasifikasi</p>
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Palawija
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <ol>
                    <li>Jagung</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Kedelai</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                  </ol>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Sayuran
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <ol>
                    <li>Sayur Daun</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Cabai</li>
                    <dd>Kelembaban Tanah : 40%-60%</dd>
                    <li>Tomat</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Kentang</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                  </ol>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Tanaman Perkebunan
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <ol>
                    <li>Padi</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Kopi</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Tebu</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Kelapa Sawit</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Kakao</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                    <li>Pisang</li>
                    <dd>Kelembaban Tanah : 30%-50%</dd>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SettingPage;
