import React from "react";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function getStatus(label, value) {
  switch (label) {
    case "Temperature":
      if (value < 18) return "Dingin";
      if (value > 30) return "Panas";
      return "Normal";
    case "Humidity":
      if (value < 30) return "Kering";
      if (value > 75) return "Lembab";
      return "Normal";
    case "Soil Moisture":
      if (value < 25) return "Kering";
      if (value > 80) return "Basah";
      return "Normal";
    default:
      return "";
  }
}

function SensorChart({ label, data, borderColor }) {
  // mengambil data terakhir
  const latestValue = data.datasets[0].data.slice(-1)[0];
  const status = getStatus(label, latestValue);
  return (
    <Card>
      <Card.Header>{label}</Card.Header>
      <Card.Body>
        <Line
          data={{
            labels: data.labels,
            datasets: [
              {
                label,
                data: data.datasets[0].data,
                fill: false,
                borderColor,
                pointBackgroundColor: borderColor,
              },
            ],
          }}
          options={{
            plugins: {
              datalabels: {
                display: true,
                color: "black",
                anchor: "start",
                align: "top",
                formatter: function (value) {
                  return value.toFixed(2);
                },
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Nilai Sensor",
                },
              },
            },
          }}
        />
        {status && (
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Status: {status}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default SensorChart;
