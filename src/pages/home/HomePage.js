import React from "react";
import { Link } from "react-router-dom";
import "../../css/HomePage.css";

function CustomButton({ label, onClick }) {
  return (
    <div
      className="button-monitoring"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
}

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8">
            <h1 className="judul" style={{ fontWeight: "bold" }}>
              WEB Monitoring Lahan Pertanian
            </h1>
            <h1
              className="judul2"
              style={{
                fontWeight: "bold",
              }}
            >
              Berbasis IoT
            </h1>
            <h5 className="subjudul">
              Efisiensi dalam monitoring lahan pertanian serta kontrol jarak
              jauh menggunakan perangkat mobile
            </h5>
            <Link
              to="/chart"
              className="d-flex justify-content-start mt-2"
              style={{ marginRight: "90px", textDecoration: "none" }}
            >
              <CustomButton label="Monitoring Sensor" />
            </Link>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ marginTop: "15px" }}
          >
            <img
              src="images/farming.webp"
              alt="gambar"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "100px" }}></hr>
      <div className="container row mt-5">
        <h2 className="text-tech">Teknologi yang digunakan</h2>
        <div
          className="row mt-5 d-flex justify-content-center gap-4"
          style={{}}
        >
          <div className="col-12 col-md-6 col-lg-3">
            <div
              class="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/DHT.jpg"
                class="card-img"
                alt="dht22"
                style={{
                  width: "90px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "0",
                }}
              />
              <div class="card-body">
                <p className="tech">Sensor DHT22</p>
                <p
                  class="card-text text-center b-tech"
                  style={{ fontSize: "13px" }}
                >
                  Memantau kondisi udara dengan akurat, termasuk suhu dan
                  kelembapan, sehingga petani dapat memahami keadaan lingkungan
                  dan menyesuaikan tindakan yang tepat.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div
              class="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/Soil.jpeg"
                class="card-img"
                alt="soil"
                style={{
                  width: "90px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "0",
                }}
              />
              <div class="card-body">
                <p className="tech">Soil Moisture</p>
                <p
                  class="card-text text-center b-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mengukur tingkat kelembapan tanah secara real-time, membantu
                  petani dalam menjaga irigasi yang optimal dan menghindari
                  kekeringan atau kelebihan air.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div
              class="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/NPK.jpg"
                class="card-img"
                alt="npk"
                style={{
                  width: "90px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "0",
                }}
              />
              <div class="card-body">
                <p className="tech">Sensor NPK</p>
                <p
                  class="card-text text-center b-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mendeteksi kadar Nitrogen, Fosfor, dan Kalium dalam tanah,
                  memberikan data yang penting untuk menjaga kesuburan tanah dan
                  meningkatkan hasil panen.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div
              class="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/espcam.jpg"
                class="card-img"
                alt="espcam"
                style={{
                  width: "90PX",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "0",
                }}
              />
              <div class="card-body">
                <p className="tech">Sensor Kamera</p>
                <p
                  class="card-text text-center b-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mendeteksi keberadaan burung menggunakan kamera dan opencv
                  serta YOLOv8, untuk mencegah gagal panen karena serangan hama
                  burung.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div
              class="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/ESP32.jpg"
                class="card-img"
                alt="esp32"
                style={{
                  width: "90px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "0",
                }}
              />
              <div class="card-body">
                <p className="tech">Mikrokontroler ESP32</p>
                <p
                  class="card-text text-center b-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mikrokontroler utama yang bertugas sebagai otak dari semua
                  tugas yang ada. ESP32 berfungsi menjadi penghubung antara
                  komponen, web, dan user dengan MQTT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "50px" }}></hr>
      <div className="text-center">
        <h2>Fitur</h2>
      </div>
      <div className="container-fitur1">
        <div className="row">
          <div className="col-8">
            <h3>Analisis Kesehatan Tanah</h3>
            <p>
              Growbot menyediakan solusi teknologi canggih yang dirancang untuk
              meningkatkan produktivitas pertanian melalui analisis mendalam
              terhadap kesehatan tanah. Dengan menggunakan sensor NPK yang mampu
              mengukur kadar nitrogen, fosfor, dan kalium secara akurat, petani
              dapat memantau dan mengelola kondisi tanah secara real-time.
              Teknologi ini membantu petani mengambil keputusan yang tepat dalam
              pemupukan dan perawatan tanah, sehingga menciptakan praktik
              pertanian yang lebih efisien, berkelanjutan, dan ramah lingkungan.
            </p>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ marginTop: "15px" }}
          >
            <img
              className="mock-up"
              src="images/logo/mockup-hp.png"
              alt="gambar"
            />
          </div>
        </div>
      </div>
      <div className="container-fitur1">
        <div className="row">
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ marginTop: "15px" }}
          >
            <img
              className="mock-up"
              src="images/logo/mockup-hp.png"
              alt="gambar"
            />
          </div>
          <div className="col-8">
            <h3>Penyiraman Air Otomatis</h3>
            <p>
              Growbot menawarkan solusi penyiraman otomatis berbasis sensor
              kelembapan tanah untuk memastikan tanaman mendapatkan jumlah air
              yang optimal. Dengan teknologi ini, sensor akan memantau tingkat
              kelembapan tanah secara real-time, dan sistem akan secara otomatis
              mengaktifkan irigasi saat kadar air di bawah ambang batas yang
              ditentukan. Fitur ini membantu petani menghemat air, mencegah
              over-irrigasi, dan menjaga kesehatan tanaman, sehingga menciptakan
              praktik pertanian yang lebih efisien dan hemat sumber daya.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fitur1">
        <div className="row">
          <div className="col-8">
            <h3>Pengusir Hama Burung</h3>
            <p>
              Growbot dilengkapi dengan fitur pengusir hama burung otomatis,
              menggunakan sensor kamera untuk mendeteksi keberadaan burung di
              lahan pertanian. Ketika sensor mendeteksi hama burung, sistem akan
              mengaktifkan mekanisme pengusiran seperti suara atau cahaya untuk
              menjauhkan burung tanpa membahayakan mereka. Teknologi ini
              membantu melindungi tanaman dari kerusakan yang disebabkan oleh
              hama, meningkatkan hasil panen, dan meminimalkan penggunaan metode
              pengusiran yang berbahaya bagi lingkungan.
            </p>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ marginTop: "15px" }}
          >
            <img
              className="mock-up"
              src="images/logo/mockup-hp.png"
              alt="gambar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
