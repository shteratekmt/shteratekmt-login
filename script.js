// Ganti URL di bawah sesuai dengan Web App Google Apps Script kamu
const SHEET_URL = "https://script.google.com/macros/s/AKfycbx9HCRtn5WhhWcb27ia-vSUSkB57iaJ6sEgwtc_t2-SmTr5Btz7ezk2kp7quBJY3Jf5/exec";

// Ambil email dari localStorage (sudah disimpan saat login)
const email = localStorage.getItem("email");

// Kalau belum login, kembalikan ke index
if (!email) {
  window.location.href = "index.html";
}

fetch(`${SHEET_URL}?email=${email}`)
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      const d = data.data;

      // Isi biodata siswa
      document.getElementById("nama").textContent = d.Nama;
      document.getElementById("nik").textContent = d.NIK;
      document.getElementById("email").textContent = d.Email;
      document.getElementById("ttl").textContent = d.TanggalLahir;
      document.getElementById("jk").textContent = d.JenisKelamin;
      document.getElementById("alamat").textContent = d.Alamat;
      document.getElementById("hp").textContent = d.NoHP;
      document.getElementById("foto").src = d.Foto;

      // Isi tabel SPP
      const sppTable = document.querySelector("#tabel-spp tbody");
      sppTable.innerHTML = "";
      Object.keys(d).forEach(k => {
        if (k.startsWith("SPP_") && d[k]) {
          const bulan = k.replace("SPP_", "");
          const status = d[k];
          const row = `
            <tr>
              <td>${bulan}</td>
              <td>Rp150.000</td>
              <td><span style="color: ${status === 'Lunas' ? 'green' : 'red'}">${status}</span></td>
            </tr>
          `;
          sppTable.innerHTML += row;
        }
      });

      // Grafik IPS/IPK
      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
          datasets: [{
            label: "IPS / IPK",
            data: [d.Sem1 || 0, d.Sem2 || 0, d.Sem3 || 0, d.Sem4 || 0],
            backgroundColor: ["#00bcd4", "#2196f3", "#4caf50", "#ff9800"]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 4
            }
          }
        }
      });

    } else {
      alert("Data tidak ditemukan.");
      window.location.href = "index.html";
    }
  })
  .catch(err => {
    console.error("Gagal mengambil data:", err);
    alert("Terjadi kesalahan, coba lagi.");
  });
