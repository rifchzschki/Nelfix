document.addEventListener("DOMContentLoaded", function () {
  const components = document.querySelectorAll(".route-link");
  const noRedirect = document.getElementById("noRedirect");

  components.forEach(function (component) {
    component.addEventListener("click", function (event) {
      console.log("hit");
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
