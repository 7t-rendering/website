const backgroundMusic = document.getElementById("backgroundMusic");
const soundIndicator = document.getElementById("soundIndicator");
const body = document.body;
const heroSection = document.getElementById("home");
const soundIndicatorBox = document.getElementById("soundIndicator");
let isPopped = false;
let clickedOnce = false;

document.querySelectorAll(".hero-image-pop.btn").forEach((element) => {
  element.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!isPopped) {
      document.querySelectorAll(".hero-image-pop").forEach((el) => {
        el.classList.add("popped");
      });

      if (!clickedOnce) {
        backgroundMusic.volume = 0.75;
        clickedOnce = true;
        setTimeout(() => {
          playMusic();
        }, 100);
      } else {
        playMusic();
      }

      isPopped = true;
    }
  });
});

function playMusic() {
  backgroundMusic
    .play()
    .then(() => {
      soundIndicator.classList.add("active");

      document.getElementById("soundWave").classList.remove("paused");
      document.getElementById("musicIcon").textContent = "🎵";
    })
    .catch((error) => {
      console.log("Audio play failed:", error);
    });
}

soundIndicatorBox.addEventListener("click", function (e) {
  e.stopPropagation();

  const soundWave = document.getElementById("soundWave");
  const musicIcon = document.getElementById("musicIcon");

  if (backgroundMusic.paused) {
    backgroundMusic.play().then(() => {
      soundWave.classList.remove("paused");
      musicIcon.textContent = "🎵";
    });
  } else {
    backgroundMusic.pause();

    soundWave.classList.add("paused");
    musicIcon.textContent = "🔇";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && isPopped) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    soundIndicator.classList.remove("active");

    document.getElementById("soundWave").classList.add("paused");
    document.getElementById("musicIcon").textContent = "🔇";

    document.querySelectorAll(".hero-image-pop").forEach((el) => {
      el.classList.remove("popped");
    });
    isPopped = false;
  }
});

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

const filterButtons = document.querySelectorAll(".filter-btn");
const editsItems = document.querySelectorAll(".instagram-post");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    editsItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

emailjs.init("7Siao0KKSSO8OFjxQ");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  const turnstileResponse = document.querySelector(
    '[name="cf-turnstile-response"]',
  ).value;

  if (!turnstileResponse) {
    alert("Please verify that you are human.");
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    return;
  }

  emailjs
    .send("service_b5h7o3p", "template_7b1yr4z", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';

      document.getElementById("contactForm").reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch((error) => {
      console.error(error);

      submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
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
        element.style.animation =
          "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards";
      }
    });
  };

  fadeInOnScroll();

  window.addEventListener("scroll", fadeInOnScroll);
});

const cursor = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

const loader = document.getElementById("loader");
const progressBar = document.getElementById("progress-bar");

let resources = performance.getEntriesByType("resource");
let totalResources = resources.length;
let loadedResources = 0;

if (totalResources === 0) totalResources = 10;

function updateProgress() {
  loadedResources++;
  let percent = (loadedResources / totalResources) * 100;
  progressBar.style.width = percent + "%";

  if (loadedResources >= totalResources) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 300);
  }
}

resources.forEach((resource) => {
  const img = new Image();
  img.src = resource.name;
  img.onload = updateProgress;
  img.onerror = updateProgress;
});

window.addEventListener("load", () => {
  progressBar.style.width = "100%";

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 500);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    let fadeOut = setInterval(() => {
      if (backgroundMusic.volume > 0) {
        backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.07);
      } else {
        clearInterval(fadeOut);

        backgroundMusic.pause();

        document.getElementById("soundWave").classList.add("paused");
        document.getElementById("musicIcon").textContent = "🔇";
      }
    }, 40);
  } else {
    if (isPopped) {
      backgroundMusic
        .play()
        .then(() => {
          document.getElementById("soundWave").classList.remove("paused");
          document.getElementById("musicIcon").textContent = "🎵";
        })
        .catch((err) => {
          console.log("Playback blocked:", err);
        });
      let fadeIn = setInterval(() => {
        if (backgroundMusic.volume < 0.75) {
          backgroundMusic.volume += 0.03;
        } else {
          backgroundMusic.volume = 0.75;
          clearInterval(fadeIn);
        }
      }, 50);
    }
  }
});
