import React, { useState } from "react";
import "../../css/SettingPage.css";

function SettingPage() {
  // Default threshold
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

  // Load threshold dari localStorage atau pakai default
  const [threshold, setThreshold] = useState(() => {
    const saved = localStorage.getItem("terra_threshold");
    return saved ? JSON.parse(saved) : defaultThreshold;
  });

  // Handler input
  const handleChange = (section, key, value) => {
    setThreshold((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: Number(value),
      },
    }));
  };

  // Simpan ke localStorage
  const handleSave = () => {
    localStorage.setItem("terra_threshold", JSON.stringify(threshold));
    alert("Threshold berhasil disimpan!");
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title text-center">
        Penyesuaian Threshold Kesimpulan & Emote Suhu
      </h1>
      <div className="settings-container2 row">
        <div className="settings-form col-6">
          <h5>Threshold Kesimpulan</h5>
          <label>Tanah Bahaya (&gt;):</label>
          <input type="number" value={threshold.conclusion.tanah_bahaya}
            onChange={e => handleChange("conclusion", "tanah_bahaya", e.target.value)} className="form-control" />
          <label>Giroskop Bahaya (|giro| &gt;):</label>
          <input type="number" value={threshold.conclusion.giro_bahaya}
            onChange={e => handleChange("conclusion", "giro_bahaya", e.target.value)} className="form-control" />
          <label>Udara Bahaya (&gt;):</label>
          <input type="number" value={threshold.conclusion.udara_bahaya}
            onChange={e => handleChange("conclusion", "udara_bahaya", e.target.value)} className="form-control" />
          <label>Tanah Siaga (min):</label>
          <input type="number" value={threshold.conclusion.tanah_siaga_min}
            onChange={e => handleChange("conclusion", "tanah_siaga_min", e.target.value)} className="form-control" />
          <label>Tanah Siaga (max):</label>
          <input type="number" value={threshold.conclusion.tanah_siaga_max}
            onChange={e => handleChange("conclusion", "tanah_siaga_max", e.target.value)} className="form-control" />
          <label>Udara Siaga (&gt;):</label>
          <input type="number" value={threshold.conclusion.udara_siaga}
            onChange={e => handleChange("conclusion", "udara_siaga", e.target.value)} className="form-control" />
          <label>Giroskop Siaga (|giro| &gt;):</label>
          <input type="number" value={threshold.conclusion.giro_siaga}
            onChange={e => handleChange("conclusion", "giro_siaga", e.target.value)} className="form-control" />

          <h5 className="mt-4">Threshold Emote Suhu</h5>
          <label>Panas (&gt;):</label>
          <input type="number" value={threshold.emote.panas}
            onChange={e => handleChange("emote", "panas", e.target.value)} className="form-control" />
          <label>Cerah (min):</label>
          <input type="number" value={threshold.emote.cerah_min}
            onChange={e => handleChange("emote", "cerah_min", e.target.value)} className="form-control" />
          <label>Cerah (max):</label>
          <input type="number" value={threshold.emote.cerah_max}
            onChange={e => handleChange("emote", "cerah_max", e.target.value)} className="form-control" />
          <label>Mendung (min):</label>
          <input type="number" value={threshold.emote.mendung_min}
            onChange={e => handleChange("emote", "mendung_min", e.target.value)} className="form-control" />
          <label>Mendung (max):</label>
          <input type="number" value={threshold.emote.mendung_max}
            onChange={e => handleChange("emote", "mendung_max", e.target.value)} className="form-control" />

          <button onClick={handleSave} className="btn mt-3">
            Simpan Threshold
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;