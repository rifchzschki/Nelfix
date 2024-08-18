document.getElementById("nav-button").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-list");
  navMenu.classList.toggle("active");
});

document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-list');
    const menuToggle = document.getElementById('nav-button');

    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});


document.getElementById('buy-button').addEventListener('click', function() {
  const purchase = document.getElementById('purchase')
  const video = document.getElementById('video');
  video.removeAttribute('disabled');
  purchase.style.display = 'none'; 
  document.getElementById('denied').style.display = 'none'; 
});