const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinks.contains(e.target);
  const isHamburger = hamburger.contains(e.target);

  if (!isClickInsideMenu && !isHamburger) {
    navLinks.classList.remove("active");
  }
});

window.addEventListener("scroll", () => {
  navLinks.classList.remove("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
        element.style.animation = "fadeInUp 1s ease-out forwards";
      }
    });
  };

  fadeInOnScroll();
  window.addEventListener("scroll", fadeInOnScroll);
});
