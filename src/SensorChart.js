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
    case "Akselerometer / Guncangan":
      if (value < 9 || value > 10) return "⚠️ Terjadi Guncangan";
      return "Normal";
    case "Kelembapan Tanah":
      if (value < 30) return "Kering";
      if (value > 75) return "Lembab";
      return "Normal";
    case "Giroskop":
      if (value < 0 || value > 0) return "⚠️ Potensi Longsor";
      return "Normal";
    case "Kelembapan Udara":
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
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        marginBottom: "24px",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)",
      }}
    >
      <Card.Header
        style={{
          background: "rgba(255,255,255,0.7)",
          borderRadius: "18px 18px 0 0",
          fontWeight: "bold",
          fontSize: "1.1rem",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        {label}
      </Card.Header>
      <Card.Body style={{ height: 360, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <div style={{ flex: "1 1 auto", minHeight: 0 }}>
          <Line
            data={{
              labels: data.labels,
              datasets: [
                {
                  label,
                  data: data.datasets[0].data,
                  fill: true,
                  borderColor,
                  borderWidth: 3,
                  backgroundColor: borderColor.replace("1)", "0.08)"),
                  pointBackgroundColor: borderColor,
                  pointRadius: 6,
                  pointHoverRadius: 9,
                  tension: 0.35,
                },
              ],
            }}
            options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                display: true,
                color: "#222",
                anchor: "end",
                align: "top",
                font: { weight: "bold", size: 12 },
                formatter: function (value) {
                  return value.toFixed(2);
                },
              },
              title: {
                display: false,
              },
              tooltip: {
                backgroundColor: "#fff",
                titleColor: "#222",
                bodyColor: "#222",
                borderColor: borderColor,
                borderWidth: 1,
                padding: 12,
                caretSize: 8,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#888",
                  font: { size: 12 },
                },
              },
              y: {
                grid: {
                  color: "#e0e7ef",
                  lineWidth: 1,
                },
                title: {
                  display: true,
                  text: "Nilai Sensor",
                  color: "#444",
                  font: { size: 14, weight: "bold" },
                },
                ticks: {
                  color: "#888",
                  font: { size: 12 },
                },
              },
            },
            maintainAspectRatio: false,
              responsive: true,
            }}
            height={220}
          />
        </div>
        {status && (
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
              letterSpacing: "1px",
              fontSize: "1.05rem",
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