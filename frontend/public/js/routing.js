document.addEventListener("DOMContentLoaded", function() {
    const component = document.getElementById("routing");
    const noRedirect = document.getElementById("noRedirect");
  
    component.addEventListener("click", function(event) {
      // Cek apakah elemen yang diklik adalah elemen non-redirect atau salah satu child-nya
      if(noRedirect!=null){
        if(noRedirect.contains(event.target)){
            return;
        }
      }
      if (event.target !== noRedirect) {
        // Ambil query dari data attribute
        const query = component.getAttribute("data-query");
        const route = component.getAttribute("route");
        
        // Redirect ke halaman lain dengan query
        window.location.href = route + query;
      }
    });
  });