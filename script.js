
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9HCRtn5WhhWcb27ia-vSUSkB57iaJ6sEgwtc_t2-SmTr5Btz7ezk2kp7quBJY3Jf5/exec";

async function getData() {
  try {
    const res = await fetch(SCRIPT_URL + "?action=me");
    const data = await res.json();

    if (!data || !data.nama) {
      alert("Gagal mengambil data. Silakan login ulang.");
      window.location.href = "index.html";
      return;
    }

    document.getElementById("siswa-nama").innerText = "Selamat Datang, " + data.nama;
    document.getElementById("nama").innerText = data.nama;
    document.getElementById("nik").innerText = data.nik;
    document.getElementById("ttl").innerText = data.tanggal_lahir;
    document.getElementById("jk").innerText = data.jenis_kelamin;
    document.getElementById("alamat").innerText = data.alamat;
    document.getElementById("hp").innerText = data.no_hp;
    document.getElementById("foto").src = data.foto;

    let sudah = 0, belum = 0;
    let html = "";
    data.tagihan.forEach(row => {
      const statusClass = row.status.toLowerCase() === "sudah" ? "status-sudah" : "status-belum";
      const jumlahAngka = parseInt(row.jumlah.replace(/\D/g, '')) || 0;

      if (row.status.toLowerCase() === "sudah") sudah += jumlahAngka;
      else belum += jumlahAngka;

      html += `<tr>
        <td>${row.bulan}</td>
        <td>${row.jumlah}</td>
        <td class="${statusClass}">${row.status}</td>
      </tr>`;
    });

    document.getElementById("dataTagihan").innerHTML = html;
    document.getElementById("sudahBayar").innerText = "Rp " + sudah.toLocaleString();
    document.getElementById("belumBayar").innerText = "Rp " + belum.toLocaleString();
  } catch (e) {
    alert("Gagal mengambil data.");
    console.error(e);
  }
}

function logout() {
  window.location.href = "index.html";
}

function cetak() {
  window.print();
}

getData();
