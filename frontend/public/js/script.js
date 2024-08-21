document.getElementById("nav-button").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-list");
  navMenu.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  const navMenu = document.getElementById("nav-list");
  const menuToggle = document.getElementById("nav-button");

  if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove("active");
  }
});

document.getElementById("detail-movies").addEventListener("DOMContentLoaded", function () {
  
});

document
  .getElementById("buy-button")
  .addEventListener("click", async function () {
    const purchase = document.getElementById("purchase");
    const video = document.getElementById("video");
    const urlParams = new URLSearchParams(window.location.search);
    const id_user = parseInt(urlParams.get("id_user"), 10);
    const id_film = parseInt(urlParams.get("id_film"), 10);

    const response = await fetch("/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_user, id_film }),
    });

    console.log(response);

    if (response.ok) {
      video.removeAttribute("disabled");
      purchase.style.display = "none";
      document.getElementById("denied").style.display = "none";
    } else {
      alert("Pembelian gagal");
    }
  });
