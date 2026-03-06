// Warten bis Seite geladen ist
document.addEventListener("DOMContentLoaded", function(){

  /* =========================
     Smooth Scrolling
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth' });
      }
    });
  });

  /* =========================
     Mobile Menü Toggle
  ========================= */
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if(toggleBtn){
    toggleBtn.addEventListener("click", ()=>{
      nav.classList.toggle("nav-open");
    });
  }

  /* =========================
     Contact Form AJAX
  ========================= */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if(form){
    form.addEventListener("submit", async function(e){
      e.preventDefault();
      const data = new FormData(form);
      const action = form.action;

      try{
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.innerHTML = "💙 Danke! Deine Nachricht wurde erfolgreich gesendet.";
          status.style.color = "#3078BE";
          form.reset();
        } else {
          throw new Error("Fehler");
        }

      }catch(error){
        status.innerHTML = "⚠️ Ups! Etwas ist schiefgelaufen. Bitte versuche es erneut.";
        status.style.color = "#cc0000";
      }
    });
  }

});


/* Mobile Menü Button */
.menu-toggle{
  display:none;
  position:absolute;
  right:20px;
  top:35px;
  font-size:26px;
  background:none;
  border:none;
  cursor:pointer;
}

/* Mobile Menü */
@media (max-width:768px){
  .menu-toggle{
    display:block;
  }

  .nav{
    display:none;
    flex-direction:column;
    gap:20px;
    margin-top:20px;
  }

  .nav.nav-open{
    display:flex;
  }
}
