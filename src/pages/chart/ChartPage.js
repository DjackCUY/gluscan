import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SensorChart from "../../SensorChart"; // Import komponen SensorChart

function ChartPage({
  sensorData1,
  sensorData2,
  sensorData3,
  sensorDataN,
  sensorDataP,
  sensorDataK,
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
    createChartData("Temperature", "rgba(255, 0, 0,1)")
  );
  const [chartData2, setChartData2] = useState(
    createChartData("Humidity", "rgba(15, 255, 3,1)")
  );
  const [chartData3, setChartData3] = useState(
    createChartData("Soil Moisture", "rgba(138, 69, 0)")
  );
  const [chartDataN, setChartDataN] = useState(
    createChartData("Nitrogen", "rgba(255, 247, 0)")
  );
  const [chartDataP, setChartDataP] = useState(
    createChartData("Phosphorous", "rgba(255, 247, 0)")
  );
  const [chartDataK, setChartDataK] = useState(
    createChartData("Potassium", "rgba(255, 247, 0)")
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
    if (sensorData1) updateChart(sensorData1, setChartData1);
    if (sensorData2) updateChart(sensorData2, setChartData2);
    if (sensorData3) updateChart(sensorData3, setChartData3);
    if (sensorDataN) updateChart(sensorDataN, setChartDataN);
    if (sensorDataP) updateChart(sensorDataP, setChartDataP);
    if (sensorDataK) updateChart(sensorDataK, setChartDataK);
  }, [
    sensorData1,
    sensorData2,
    sensorData3,
    sensorDataN,
    sensorDataP,
    sensorDataK,
  ]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Row className="g-4 mb-4">
        <Col
          md={6}
          style={{
            Color: "#f8f9fa",
          }}
        >
          <SensorChart
            label="Temperature"
            data={chartData1}
            borderColor="rgba(255, 0, 0, 1)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Humidity"
            data={chartData2}
            borderColor="rgba(15, 255, 3,1)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Soil Moisture"
            data={chartData3}
            borderColor="rgba(138, 69, 0)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Nitrogen"
            data={chartDataN}
            borderColor="rgba(255, 247, 0)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Phosphorous"
            data={chartDataP}
            borderColor="rgba(255, 247, 0)"
          />
        </Col>
        <Col md={6}>
          <SensorChart
            label="Potassium"
            data={chartDataK}
            borderColor="rgba(255, 247, 0)"
          />
        </Col>
      </Row>
    </div>
  );
}

export default ChartPage;
