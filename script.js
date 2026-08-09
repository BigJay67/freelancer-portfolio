// Contact Form
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formStatus.textContent = "✅ Thanks for your message! I’ll be in touch.";
  contactForm.reset();
});

// Testimonial slider
let testimonials = document.querySelectorAll('.testimonial');
let current = 0;

setInterval(() => {
  testimonials[current].classList.remove('active');
  current = (current + 1) % testimonials.length;
  testimonials[current].classList.add('active');
}, 4000);

// Theme Switcher
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

// Scroll reveal animation
const scrollElements = document.querySelectorAll('.scroll-animate');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

scrollElements.forEach(el => scrollObserver.observe(el));

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scrollspy effect
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  })

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});