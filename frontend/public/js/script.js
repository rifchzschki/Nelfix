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

document.getElementById("buy-button").addEventListener("click", function () {
  const purchase = document.getElementById("purchase");
  const video = document.getElementById("video");
  video.removeAttribute("disabled");
  purchase.style.display = "none";
  document.getElementById("denied").style.display = "none";
});

async function fetchMovies() {
  try {
    // Menggunakan query parameter 'poll' untuk long polling
    const response = await fetch("films");
    if (response.status === 204) {
      // Tidak ada data, lanjutkan polling
      return [];
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

async function updateMovies() {
  const movies = await fetchMovies();
  const moviesContainer = document.getElementById("galery-movies-container");
  moviesContainer.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    movieElement.innerHTML = `
      <div class="card-container active-button" style="cursor: pointer;">
        <img src="${movie.coverImage}" alt="${movie.title}" style="margin-bottom: 0px;"/>
        <div style="margin-top: 0px;">
          <span class="price-info">Tonton</span>
        </div>
      </div>
    `;

    moviesContainer.appendChild(movieElement);
  });
}

function startLongPolling() {
  updateMovies().then(() => {
    setTimeout(startLongPolling, 5000); // Polling setiap 5 detik
  });
}

window.onload = startLongPolling;
