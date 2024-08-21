document.addEventListener("DOMContentLoaded", function () {
  const components = document.querySelectorAll(".route-link");
  const noRedirect = document.getElementById("noRedirect");

  components.forEach(async function (component) {
    component.addEventListener("click", function (event) {
      if (noRedirect != null) {
        if (noRedirect.contains(event.target)) {
          return;
        }
      }
      if (event.target !== noRedirect) {
        const query = component.getAttribute("data-query");
        const route = component.getAttribute("route");

        window.location.href = route + query;
      }
    });
  });
});

document.getElementById("search-form").addEventListener("submit", function (e) {
  const searchInput = document.getElementById("search-input");
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `/browse?query=${query}`;
  } else {
    window.location.href = `/browse`;
  }
});

// Handle Logout
document
  .getElementById("logout-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch("/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Logout gagal!");
    }
  });
