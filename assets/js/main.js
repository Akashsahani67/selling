/* ============================================================
   SITE-WIDE BEHAVIOR
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initScrollReveal();
  initFAQ();
  initContactForm();
  initNewsletterForm();
  initYear();
});

/* ---------- mobile nav ---------- */
function initNavToggle(){
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

/* ---------- reveal-on-scroll for static (non-JS-injected) elements ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
}

/* ---------- FAQ accordion (contact page) ---------- */
function initFAQ(){
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    if(!q) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if(!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- contact form (static — no backend wired up) ---------- */
function initContactForm(){
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("form-msg");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(msg){
      msg.textContent = "Thanks — your message looks great. Connect this form to your email or form service to start receiving it.";
      msg.classList.add("show");
    }
    form.reset();
  });
}

/* ---------- newsletter band form ---------- */
function initNewsletterForm(){
  const form = document.getElementById("newsletter-form");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if(input) input.value = "";
    if(typeof showToast === "function"){
      showToast("You're on the list — thanks for subscribing.");
    }
  });
}

/* ---------- footer year ---------- */
function initYear(){
  const el = document.getElementById("year");
  if(el) el.textContent = new Date().getFullYear();
}
