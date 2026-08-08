const menuToggle = document.getElementById("menuToggle");
const topnav = document.querySelector(".topnav");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

menuToggle.addEventListener("click", () => {
  const isOpen = topnav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".topnav a").forEach((link) => {
  link.addEventListener("click", () => {
    topnav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


const companyVideo = document.querySelector(".company-video");
const companyVideoFrame = document.querySelector(".company-video-frame");
const videoPoster = document.querySelector(".video-poster");

if (companyVideo && companyVideoFrame && videoPoster) {
  videoPoster.addEventListener("click", () => {
    companyVideoFrame.src = companyVideoFrame.dataset.src;
    companyVideo.classList.add("is-playing");
    videoPoster.setAttribute("aria-hidden", "true");
  });
}

document.documentElement.classList.add("js-ready");

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const tiltItems = document.querySelectorAll("[data-tilt]");
const pointerFine = window.matchMedia("(pointer: fine)").matches;
if (pointerFine) {
  document.body.classList.add("has-pointer");
  const cursorGlow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }
  }, { passive: true });

  tiltItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - y) * 5;
      const rotateY = (x - 0.5) * 6;
      item.style.setProperty("--spot-x", `${x * 100}%`);
      item.style.setProperty("--spot-y", `${y * 100}%`);
      item.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    item.addEventListener("pointerleave", () => {
      item.style.transform = "";
    });
  });
}

const statGrid = document.querySelector(".stat-grid");
if (statGrid) {
  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      statGrid.classList.add("is-counting");
      statGrid.querySelectorAll("strong").forEach((node) => {
        const original = node.textContent.trim();
        const number = parseInt(original.replace(/\D/g, ""), 10);
        if (!Number.isNaN(number)) {
          const suffix = original.replace(/[0-9]/g, "");
          const duration = 900;
          const start = performance.now();
          const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = String(Math.round(number * eased)) + suffix;
            if (progress < 1) window.requestAnimationFrame(update);
          };
          window.requestAnimationFrame(update);
        }
      });
      observer.disconnect();
    });
  }, { threshold: 0.45 });
  statObserver.observe(statGrid);
}
const portrait = document.querySelector(".editorial-portrait");
if (portrait) {
  portrait.addEventListener("animationend", (event) => {
    if (event.animationName === "portrait-in") {
      portrait.style.animation = "none";
      portrait.classList.add("portrait-ready");
    }
  });
}

const motionToggle = document.getElementById("motionToggle");
if (motionToggle) {
  motionToggle.addEventListener("click", () => {
    const paused = document.body.classList.toggle("motion-paused");
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.textContent = paused ? "Resume animations" : "Pause animations";
  });
}
