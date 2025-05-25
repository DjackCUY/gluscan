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
              WEB Monitoring Titik Rawan Longsor
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
              Sistem IoT yang merepresentasikan kemajuan dalam teknologi pemantauan geologi, 
              berfokus pada optimalisasi efisiensi dalam identifikasi potensi longsor. 
              Dengan integrasi sensor akselerometer, kelembapan tanah, dan giroskop, 
              sistem ini menyediakan data real-time mengenai dinamika tanah.
            </h5>
            <Link
              to="/chart"
              className="d-flex justify-content-start mt-2"
              style={{ marginRight: "90px", textDecoration: "none" }}
            >
              <CustomButton label="Grafik Monitoring" />
            </Link>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ marginTop: "20px" }}
          >
            <img
              src="images/tanah-m.jpg"
              alt="gambar-monitoring-tanah"
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
      <hr style={{ marginTop: "25px" }}></hr>
      <div className="container row mt-5">
        <h2 className="text-tech">Teknologi yang digunakan</h2>
        <div
          className="row mt-5 justify-content-center gap-4"
          style={{}}
        >
          <div className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
            <div
              className="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/mpu-sensor.jpg"
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
                <p className="tech">Sensor Akselerometer</p>
                <p
                  class="deskripsi-kartu-tech"
                  style={{ fontSize: "13px" }}
                >
                  Sensor akselerometer berguna untuk mendeteksi gempa dengan mengukur percepatan 
                  getaran tanah secara real-time pada tiga sumbu.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
            <div
              className="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/soil-sensor.webp"
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
                <p className="tech">Sensor Soil Moisture</p>
                <p
                  class="deskripsi-kartu-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mengukur tingkat kelembapan tanah secara real-time, membantu
                  mendeteksi potensi longsor yang disebabkan kadar air yang berlebih.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
            <div
              className="card d-flex align-items-center shadow mb-5 bg-body rounded"
              style={{ width: "230px", height: "273px", border: "none" }}
            >
              <img
                src="/images/DHT.jpg"
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
                <p className="tech">Sensor DHT-22</p>
                <p
                  class="deskripsi-kartu-tech"
                  style={{ fontSize: "13px", textAlign: "justify"}}
                >
                  Mengukur suhu dan kelembapan udara. Kelembapan udara yang tinggi dan perubahan suhu 
                  dapat menjadi indikator awal kondisi tanah yang mulai jenuh air, yang meningkatkan risiko longsor. 
                </p>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
            <div
              className="card d-flex align-items-center shadow mb-5 bg-body rounded"
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
                  class="deskripsi-kartu-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mendeteksi keberadaan burung menggunakan kamera dan opencv
                  serta YOLOv8, untuk mencegah gagal panen karena serangan hama
                  burung.
                </p>
              </div>
            </div>
          </div> */}
          <div className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
            <div
              className="card d-flex align-items-center shadow mb-5 bg-body rounded"
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
                  class="deskripsi-kartu-tech"
                  style={{ fontSize: "13px" }}
                >
                  Mikrokontroler utama yang bertugas sebagai otak dari semua
                  tugas yang ada, berfungsi sebagai penghubung antara
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
            <h3>Deteksi Pergerakan Tanah </h3>
            <p>
              TerraSentry dilengkapi dengan akselerometer multi-arah berpresisi tinggi. Sensor ini mampu mendeteksi dan 
              mengukur pergeseran atau pergerakan tanah sekecil apa pun, baik secara horizontal maupun vertikal. 
              Dengan kapabilitas ini, TerraSentry dapat mengidentifikasi anomali pergerakan mikro yang seringkali menjadi 
              indikator awal ketidakstabilan lereng, memberikan peringatan dini yang krusial sebelum pergerakan berkembang 
              menjadi longsor besar. Akurasi deteksi ini sangat vital untuk keselamatan dan mitigasi risiko.
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
          <div className="col-8">
            <h3>Pengukuran Kelembapan Tanah</h3>
            <p>
              Faktor kunci dalam pemicu longsor adalah saturasi air pada tanah. 
              TerraSentry mengatasi hal ini dengan sensor kelembapan tanah yang akurat. Sensor ini secara 
              terus-menerus memantau kadar air dalam lapisan tanah, memberikan data real-time mengenai tingkat kejenuhan. 
              Peningkatan signifikan pada kelembapan tanah akan segera terdeteksi, memungkinkan analisis risiko yang lebih 
              mendalam dan tindakan pencegahan yang tepat waktu, terutama saat atau setelah hujan lebat.
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
          <div className="col-8">
            <h3>Pemantauan Kemiringan Tanah</h3>
            <p>
              Untuk analisis yang lebih komprehensif, TerraSentry mengintegrasikan giroskop canggih. 
              Sensor ini melacak perubahan orientasi dan kemiringan lereng dengan presisi tinggi. 
              Data dari giroskop memungkinkan identifikasi adanya deformasi struktural pada tanah atau lereng yang 
              mungkin tidak terlihat dari pergerakan horizontal saja. Fitur ini memberikan gambaran yang lebih lengkap 
              tentang dinamika lereng, membantu dalam memprediksi arah dan jenis potensi longsor.
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
          <div className="col-8">
            <h3>Transmisi Data Real-time</h3>
            <p>
              Inti dari efektivitas TerraSentry adalah kemampuan transmisi data real-time. 
              Seluruh data yang dikumpulkan dari akselerometer, sensor kelembapan, dan giroskop akan langsung 
              dikirimkan ke platform pemantauan tanpa penundaan. Sistem ini juga dapat memberikan kesimpulan status tanah jika terdeteksi 
              ambang batas bahaya atau anomali yang telah ditentukan, memastikan Anda mendapatkan informasi kritis sesegera mungkin.
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
