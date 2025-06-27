import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SensorChart from "../../SensorChart";

const defaultThreshold = {
  conclusion: {
    tanah_bahaya: 70,
    giro_bahaya: 15,
    udara_bahaya: 85,
    tanah_siaga_min: 40,
    tanah_siaga_max: 60,
    udara_siaga: 60,
    giro_siaga: 5,
  },
  emote: {
    panas: 30,
    cerah_min: 25,
    cerah_max: 30,
    mendung_min: 20,
    mendung_max: 25,
  },
};

const threshold = JSON.parse(localStorage.getItem("terra_threshold")) || defaultThreshold;

function ChartPage({ sensorDataNodes }) {
  const nodeList = Object.keys(sensorDataNodes || {});
  const [selectedNode, setSelectedNode] = useState(nodeList[0] || "");

  useEffect(() => {
    if (!selectedNode && nodeList.length > 0) {
      setSelectedNode(nodeList[0]);
    }
    if (selectedNode && !nodeList.includes(selectedNode)) {
      setSelectedNode(nodeList[0] || "");
    }
  }, [nodeList, selectedNode]);

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

  const [chartData1, setChartData1] = useState(createChartData("Akselerometer", "rgba(255, 0, 0,1)"));
  const [chartData2, setChartData2] = useState(createChartData("Giroskop", "rgba(15, 255, 3,1)"));
  const [chartData3, setChartData3] = useState(createChartData("Kelembapan Tanah", "rgba(138, 69, 0)"));
  const [chartDataN, setChartDataN] = useState(createChartData("Kelembapan Udara", "rgba(56, 56, 255)"));

  useEffect(() => {
    const nodeData = sensorDataNodes[selectedNode] || {};
    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour12: false,
      timeZone: "Asia/Jakarta",
    });

    const update = (value, setChart) => {
      if (value === undefined) return;
      setChart((prev) => {
        const newLabels = [...prev.labels, currentTime];
        const newData = [...prev.datasets[0].data, parseFloat(value)];
        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }
        return {
          labels: newLabels,
          datasets: [{ ...prev.datasets[0], data: newData }],
        };
      });
    };

    update(nodeData.acc, setChartData1);
    update(nodeData.gyro, setChartData2);
    update(nodeData.moisture, setChartData3);
    update(nodeData.humidity, setChartDataN);
  }, [sensorDataNodes, selectedNode]);

  const {
    kesimpulan
  } = useMemo(() => {
    const tanah = chartData3.datasets[0].data.slice(-1)[0] ?? 0;
    const giro = chartData2.datasets[0].data.slice(-1)[0] ?? 0;
    const udara = chartDataN.datasets[0].data.slice(-1)[0] ?? 0;

    let result = "😊 Keadaan Normal";

    if (
      tanah > threshold.conclusion.tanah_bahaya &&
      (giro > threshold.conclusion.giro_bahaya || giro < -threshold.conclusion.giro_bahaya) &&
      udara > threshold.conclusion.udara_bahaya
    ) {
      result = "🚨 Bencana Sudah Terjadi";
    } else if (
      tanah > threshold.conclusion.tanah_siaga_min &&
      tanah < threshold.conclusion.tanah_siaga_max &&
      udara > threshold.conclusion.udara_siaga &&
      (giro > threshold.conclusion.giro_siaga || giro < -threshold.conclusion.giro_siaga)
    ) {
      result = "⚠️ Keadaan Siaga";
    }

    return {
      lastKelembapanTanah: tanah,
      lastGiroskop: giro,
      lastKelembapanUdara: udara,
      kesimpulan: result,
    };
  }, [chartData2, chartData3, chartDataN]);

  const nodeData = sensorDataNodes[selectedNode] || {};
  const suhu = nodeData.temperature ?? "-";

  let emote = "";
  if (suhu > threshold.emote.panas) emote = "☀️";
  else if (suhu >= threshold.emote.cerah_min && suhu <= threshold.emote.cerah_max) emote = "🌤️";
  else if (suhu >= threshold.emote.mendung_min && suhu < threshold.emote.mendung_max) emote = "🌥️";
  else emote = "☁️";

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
        <Form style={{ maxWidth: 300, margin: "0 auto 16px auto" }}>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>Pilih Node</Form.Label>
            <Form.Select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)}>
              {nodeList.map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        Kesimpulan: {kesimpulan}
        <br />
        Temperatur Udara: {emote + suhu}
      </div>

      <div className="container" style={{ marginTop: "25px" }}>
        <Row className="g-4 mb-4">
          <Col md={6}>
            <SensorChart
              label="Akselerometer / Guncangan"
              data={chartData1}
              borderColor="rgba(255, 0, 0, 1)"
            />
          </Col>
          <Col md={6}>
            <SensorChart label="Giroskop" data={chartData2} borderColor="rgba(15, 255, 3,1)" />
          </Col>
          <Col md={6}>
            <SensorChart label="Kelembapan Tanah" data={chartData3} borderColor="rgba(138, 69, 0)" />
          </Col>
          <Col md={6}>
            <SensorChart label="Kelembapan Udara" data={chartDataN} borderColor="rgba(56, 56, 255)" />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ChartPage;
