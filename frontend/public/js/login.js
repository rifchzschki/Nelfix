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
  const getProfileButton = document.getElementById("getProfile");
  const profileInfo = document.getElementById("profileInfo");

  // Handle Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // Simpan JWT di localStorage
      localStorage.setItem("token", data.access_token);
      window.location.href = '/dashboard';
      alert("Login successful!");
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

  // Handle Get Profile
  getProfileButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      profileInfo.textContent = `User ID: ${data.userId}, Username: ${data.username}`;
    } else {
      alert("Failed to get profile: " + data.message);
    }
  });
});
