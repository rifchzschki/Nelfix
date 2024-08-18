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
