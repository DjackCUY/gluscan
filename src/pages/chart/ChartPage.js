import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SensorChart from "../../SensorChart"; // Import komponen SensorChart

function ChartPage({
  sensorDataAkselerometer,
  sensorData2,
  sensorData3,
  sensorDataKelembapanT
}) {

  const createChartData = (label, borderColor) => ({
    labels: [],
    datasets: [
      {
        label,
        data: [],
        fill: false,
        borderColor,
      },
    ],
  });

  const [chartData1, setChartData1] = useState(
    createChartData("Akselerometer / Guncangan", "rgba(255, 0, 0,1)")
  );
  const [chartData2, setChartData2] = useState(
    createChartData("Giroskop", "rgba(15, 255, 3,1)")
  );
  const [chartData3, setChartData3] = useState(
    createChartData("Kelembapan Tanah", "rgba(138, 69, 0)")
  );
  const [chartDataN, setChartDataN] = useState(
    createChartData("Kelembapan Udara", "rgba(255, 247, 0)")
  );

  const updateChart = (sensorData, setChartData) => {
    const currentTime = new Date().toLocaleTimeString();
    setChartData((prevState) => {
      const newLabels = [...prevState.labels, currentTime];
      const newData = [...prevState.datasets[0].data, parseFloat(sensorData)];

      if (newLabels.length > 10) {
        newLabels.shift();
        newData.shift();
      }

      return {
        labels: newLabels,
        datasets: [{ ...prevState.datasets[0], data: newData }],
      };
    });
  };

  useEffect(() => {
    if (sensorDataAkselerometer) updateChart(sensorDataAkselerometer, setChartData1);
    if (sensorDataKelembapanT) updateChart(sensorDataKelembapanT, setChartData2);
    if (sensorData2) updateChart(sensorData2, setChartData3);
    if (sensorData3) updateChart(sensorData3, setChartDataN);
  }, [
    sensorDataAkselerometer,
    sensorDataKelembapanT,
    sensorData2,
    sensorData3
  ]);

// Ambil nilai terakhir dari setiap chart
const lastKelembapanTanah = chartData2.datasets[0].data.slice(-1)[0];
const lastGiroskop = chartData3.datasets[0].data.slice(-1)[0];
const lastKelembapanUdara = chartDataN.datasets[0].data.slice(-1)[0];

// Contoh logika kesimpulan berbasis angka
let conclusion = "😊 Keadaan Normal";
if (
  (lastKelembapanTanah > 40 && lastKelembapanTanah < 60) &&
  lastKelembapanUdara > 60 &&
  (lastGiroskop > 5 || lastGiroskop < -5)
) {
  conclusion = "⚠️ Keadaan Siaga";
} else if (
  lastKelembapanTanah > 70 &&
  (lastGiroskop > 15 || lastGiroskop < -15) &&
  lastKelembapanUdara > 85
) {
  conclusion = "🚨 Bencana Sudah Terjadi";
}



  return (
    <div>
      <div
        style={{
          margin: "100px auto 0 auto",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#2d3748",
          letterSpacing: "1px",
        }}
      >
        Kesimpulan: {conclusion}
      </div>
    <div className="container" style={{ marginTop: "25px" }}>
      <Row className="g-4 mb-4">
        <Col
          md={6}
          style={{
            Color: "#f8f9fa",
          }}
        >
          <SensorChart
            label="Akselerometer / Guncangan"
            data={chartData1}
            borderColor="rgba(255, 0, 0, 1)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Kelembapan Tanah"
            data={chartData2}
            borderColor="rgba(138, 69, 0)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Giroskop"
            data={chartData3}
            borderColor="rgba(15, 255, 3,1)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Kelembapan Udara"
            data={chartDataN}
            borderColor="rgba(56, 56, 255)"
          />
        </Col>
      </Row>
    </div>
    </div>
  );
}

export default ChartPage;
