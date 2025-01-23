import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col } from "react-bootstrap";

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ChartPage({
  sensorData1,
  sensorData2,
  sensorData3,
  sensorDataN,
  sensorDataP,
  sensorDataK,
}) {
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Temperature",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Humidity",
        data: [],
        fill: false,
        borderColor: "rgba(244,180,0,1)",
      },
    ],
  });

  const [chartData3, setChartData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Soil Moisturize",
        data: [],
        fill: false,
        borderColor: "rgba(192,75,75,1)",
      },
    ],
  });

  const [chartDataN, setChartDataN] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Nitrogen",
        data: [],
        fill: false,
        borderColor: "rgba(192,75,75,1)",
      },
    ],
  });

  const [chartDataP, setChartDataP] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Phosphorous",
        data: [],
        fill: false,
        borderColor: "rgba(192,75,75,1)",
      },
    ],
  });

  const [chartDataK, setChartDataK] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Soil Potassium",
        data: [],
        fill: false,
        borderColor: "rgba(192,75,75,1)",
      },
    ],
  });

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();

    if (sensorData1) {
      setChartData1((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorData1),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }

    if (sensorData2) {
      setChartData2((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorData2),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }

    if (sensorData3) {
      setChartData3((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorData3),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }

    if (sensorDataN) {
      setChartDataN((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorDataN),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }

    if (sensorDataP) {
      setChartDataP((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorDataP),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }

    if (sensorDataK) {
      setChartDataK((prevState) => {
        const newLabels = [...prevState.labels, currentTime];
        const newData = [
          ...prevState.datasets[0].data,
          parseFloat(sensorDataK),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }
  }, [
    sensorData1,
    sensorData2,
    sensorData3,
    sensorDataN,
    sensorDataP,
    sensorDataK,
  ]);

  return (
    <div className="container mt-4">
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Temperature</Card.Header>
            <Card.Body>
              <Line data={chartData1} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Humidity</Card.Header>
            <Card.Body>
              <Line data={chartData2} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Soil Moisturize</Card.Header>
            <Card.Body>
              <Line data={chartData3} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Nitrogen</Card.Header>
            <Card.Body>
              <Line data={chartDataN} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Phosphorous</Card.Header>
            <Card.Body>
              <Line data={chartDataP} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Potassium</Card.Header>
            <Card.Body>
              <Line data={chartDataK} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ChartPage;
