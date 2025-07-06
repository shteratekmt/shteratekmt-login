
function login() {
  alert("Login Google akan dikaitkan ke spreadsheet...");
  window.location.href = "dashboard.html";
}

function logout() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const dummyData = {
    nama: "Mukrodin",
    nik: "1234567890",
    jk: "Laki-laki",
    alamat: "Jakarta Timur",
    spp: [
      { bulan: "Januari", status: "Sudah" },
      { bulan: "Februari", status: "Belum" },
      { bulan: "Maret", status: "Belum" },
    ]
  };

  if (document.getElementById("nama")) {
    document.getElementById("nama").textContent = dummyData.nama;
    document.getElementById("nik").textContent = dummyData.nik;
    document.getElementById("jk").textContent = dummyData.jk;
    document.getElementById("alamat").textContent = dummyData.alamat;

    const tabel = document.getElementById("tabel-spp");
    dummyData.spp.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.bulan}</td><td>${row.status}</td>`;
      tabel.appendChild(tr);
    });
  }
});
