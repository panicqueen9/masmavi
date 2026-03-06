// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior:'smooth'
    });
  });
});

//Contact Form
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(e){
  e.preventDefault();
  const data = new FormData(form);
  const action = form.action;

  const response = await fetch(action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    status.innerHTML = "💙 Danke! Deine Nachricht wurde erfolgreich gesendet.";
    status.style.color = "#2f6df6";
    form.reset();
  } else {
    status.innerHTML = "⚠️ Ups! Etwas ist schiefgelaufen. Bitte versuche es erneut.";
    status.style.color = "#cc0000";
  }
});
