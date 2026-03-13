// ==============================
// 🎨 Ghibli Art Generator — Script
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initParticles();
  initScrollReveal();
  initMobileMenu();
  initSmoothScroll();
  initUploadDemo();
});

// --- Sticky Navbar ---
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = scrollY;
  });
}

// --- Floating Particles ---
function initParticles() {
  const container = document.querySelector(".particles");
  if (!container) return;

  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = (Math.random() * 4 + 2) + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = (Math.random() * 6 + 6) + "s";
    container.appendChild(particle);
  }
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// --- Mobile Menu ---
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.textContent = "☰";
    });
  });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// --- Upload Demo ---
function initUploadDemo() {
  const uploadArea = document.getElementById("upload-demo-area");
  const uploadInput = document.getElementById("upload-demo-input");
  const uploadPreview = document.getElementById("upload-preview");
  const uploadPlaceholder = document.getElementById("upload-placeholder");
  const generateBtn = document.getElementById("generate-demo-btn");
  const resultArea = document.getElementById("result-demo-area");
  const resultImage = document.getElementById("result-demo-image");
  const loadingOverlay = document.getElementById("loading-overlay");

  if (!uploadArea) return;

  // Click to upload
  uploadArea.addEventListener("click", () => uploadInput.click());

  // Drag & drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("drag-over");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("drag-over");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      showPreview(file);
    }
  });

  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) showPreview(file);
  });

  function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadPreview.src = e.target.result;
      uploadPreview.style.display = "block";
      uploadPlaceholder.style.display = "none";
      generateBtn.style.display = "inline-flex";
    };
    reader.readAsDataURL(file);
  }

  // Generate demo
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const file = uploadInput.files[0];
      if (!file) {
        alert("Please select an image first.");
        return;
      }

      loadingOverlay.style.display = "flex";
      generateBtn.disabled = true;
      generateBtn.textContent = "✨ Generating...";

      const formData = new FormData();
      formData.append("image", file);

      fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        loadingOverlay.style.display = "none";
        if (data.error) {
          alert("Error: " + data.error);
          generateBtn.textContent = "✨ Generate Again";
          generateBtn.disabled = false;
          return;
        }
        
        resultArea.style.display = "block";
        resultImage.src = "http://127.0.0.1:5000" + (data.upscaled || data.generated);
        generateBtn.textContent = "✨ Generate Again";
        generateBtn.disabled = false;
      })
      .catch(error => {
        loadingOverlay.style.display = "none";
        alert("An error occurred during generation.");
        console.error("Error:", error);
        generateBtn.textContent = "✨ Generate Again";
        generateBtn.disabled = false;
      });
    });
  }
}
