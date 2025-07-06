// Ganti URL berikut dengan URL Web App Google Apps Script kamu document.addEventListener("DOMContentLoaded", () => { const emailLogin = sessionStorage.getItem("email"); const scriptURL = "https://script.google.com/macros/s/AKfycbx9HCRtn5WhhWcb27ia-vSUSkB57iaJ6sEgwtc_t2-SmTr5Btz7ezk2kp7quBJY3Jf5/exec";

if (!emailLogin) { alert("Silakan login terlebih dahulu!"); window.location.href = "index.html"; return; }

fetch(${scriptURL}?email=${emailLogin}) .then((res) => res.json()) .then((data) => { if (!data || !data.nama) { alert("Data siswa tidak ditemukan."); return; }

// Isi Biodata
  document.getElementById("nama").innerText = data.nama;
  document.getElementById("nik").innerText = data.nik;
  document.getElementById("email").innerText = data.email;
  document.getElementById("tgl_lahir").innerText = data.tanggal_lahir;
  document.getElementById("jk").innerText = data.jk;
  document.getElementById("alamat").innerText = data.alamat;
  document.getElementById("nohp").innerText = data.hp;
  document.getElementById("foto").src = data.foto;

  // Tabel Tagihan SPP
  const tbody = document.getElementById("tabel-spp");
  tbody.innerHTML = "";
  let totalBayar = 0;
  let totalBelum = 0;

  data.spp.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.bulan}</td>
      <td>Rp ${parseInt(row.jumlah).toLocaleString()}</td>
      <td style="color: ${row.status.toLowerCase() === 'lunas' ? 'green' : 'red'}">${row.status}</td>
    `;
    tbody.appendChild(tr);

    if (row.status.toLowerCase() === "lunas") totalBayar += parseInt(row.jumlah);
    else totalBelum += parseInt(row.jumlah);
  });

  document.getElementById("sudahBayar").innerText = `Rp ${totalBayar.toLocaleString()}`;
  document.getElementById("belumBayar").innerText = `Rp ${totalBelum.toLocaleString()}`;

  // Grafik IPK / IPS
  new Chart(document.getElementById("grafikNilai"), {
    type: "line",
    data: {
      labels: data.nilai.map((n) => n.semester),
      datasets: [
        {
          label: "IPK",
          data: data.nilai.map((n) => parseFloat(n.ipk)),
          borderColor: "teal",
          backgroundColor: "rgba(0, 128, 128, 0.1)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
        },
      },
    },
  });
})
.catch((err) => {
  console.error("Gagal ambil data:", err);
  alert("Gagal mengambil data siswa.");
});

});

function logout() { sessionStorage.clear(); window.location.href = "index.html"; }

function cetak() { window.print(); }

