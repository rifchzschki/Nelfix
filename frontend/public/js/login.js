function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/";
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const signUpButton_mobile = document.getElementById("signUp-mobile");
  const signInButton_mobile = document.getElementById("signIn-mobile");
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  signUpButton_mobile.addEventListener("click", () => {
    container.classList.add("switch");
  });

  signInButton_mobile.addEventListener("click", () => {
    container.classList.remove("switch");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");


  // Handle Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()).data;
    if (response.ok) {
      const responseCookies = await fetch("/auth/cookies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (responseCookies.ok) {
        window.location.href = "/dashboard";
        alert("Login successful!");
      }
    } else {
      alert("Login failed: " + data.message);
    }
  });

  // Handle Signup
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const namaDepan = document.getElementById("daftarNamaDepan").value;
    const namaBelakang = document.getElementById("daftarNamaBelakang").value;
    const balance = 0;
    const email = document.getElementById("daftarEmail").value;
    const username = document.getElementById("daftarUsername").value;
    const password = document.getElementById("daftarPassword").value;
    const role = "user";

    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaDepan,
        namaBelakang,
        balance,
        email,
        username,
        password,
        role,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");
    } else {
      alert("Signup failed: " + data.message);
    }
  });
});
