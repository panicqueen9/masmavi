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

  /* =========================
   VIDEO LIGHTBOX (SAFE)
========================= */
const cinemaItems = document.querySelectorAll(".cinema-item");

cinemaItems.forEach(item => {
  item.addEventListener("click", (e) => {

    // verhindert Klick wenn Seite lädt
    if(!e.isTrusted) return;

    const videoId = item.getAttribute("data-video");
    if(!videoId) return;

    const overlay = document.createElement("div");
    overlay.className = "video-overlay";

    overlay.innerHTML = `
      <div class="video-popup">
        <div class="video-close">&times;</div>
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".video-close").addEventListener("click", () => {
      overlay.remove();
    });

    overlay.addEventListener("click", (e) => {
      if(e.target === overlay){
        overlay.remove();
      }
    });
  });
});
});


/* =========================
   IMAGE LIGHTBOX
========================= */

const images = document.querySelectorAll(".grid img");
const lightbox = document.getElementById("imgLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeImg = document.querySelector(".img-close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeImg.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if(e.target !== lightboxImg){
    lightbox.style.display = "none";
  }
});


/* =========================
   SKILLS SCROLL ANIMATION
========================= */

const skillSection = document.querySelector("#skills");
const skillBars = document.querySelectorAll(".skill-bar div");

function animateSkills(){
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight * 0.8;

  if(sectionPos < screenPos){
    skillBars.forEach(bar=>{
      bar.style.width = bar.getAttribute("data-width");
    });
    window.removeEventListener("scroll", animateSkills);
  }
}

window.addEventListener("scroll", animateSkills);


/* =========================
   SKILLS SMOOTH ANIMATION
========================= */

const skillsSection = document.querySelector(".skills-section");
const bars = document.querySelectorAll(".skill-bar div");

function revealSkills(){
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.85;

  if(sectionTop < triggerPoint){
    bars.forEach((bar, i)=>{
      setTimeout(()=>{
        bar.style.width = bar.getAttribute("data-width");
      }, i * 180); // leicht nacheinander
    });

    window.removeEventListener("scroll", revealSkills);
  }
}

window.addEventListener("scroll", revealSkills);