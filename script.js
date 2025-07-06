
function login() {
  const loginButton = document.getElementById("login-btn");
  loginButton.disabled = true;
  loginButton.innerText = "Memproses...";
  loginButton.style.backgroundColor = "#888";

  setTimeout(() => {
    const loginBerhasil = true;

    if (loginBerhasil) {
      loginButton.innerText = "Login Berhasil!";
      loginButton.style.backgroundColor = "#2ecc71";
      window.location.href = "dashboard.html";
    } else {
      loginButton.innerText = "Login Gagal!";
      loginButton.style.backgroundColor = "#e74c3c";
      loginButton.disabled = false;
    }
  }, 1500);
}
