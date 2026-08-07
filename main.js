const menuToggle = document.getElementById("menuToggle");
const topnav = document.querySelector(".topnav");
const inquiryForm = document.getElementById("inquiryForm");
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

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(inquiryForm);
  const subject = `European glove enquiry from ${formData.get("name") || "a website visitor"}`;
  const body = [
    `Name: ${formData.get("name") || ""}`,
    `Company: ${formData.get("company") || ""}`,
    `Interest: ${formData.get("interest") || ""}`,
    "",
    formData.get("message") || "",
  ].join("\n");
  window.location.href = `mailto:nicolegan@intco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast("Opening your email app…");
});

const companyVideo = document.querySelector(".company-video");
const companyVideoFrame = document.querySelector(".company-video-frame");

if (companyVideo && companyVideoFrame && "IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        companyVideoFrame.src = companyVideoFrame.dataset.src;
        companyVideo.classList.add("is-playing");
        videoObserver.unobserve(companyVideo);
      }
    });
  }, { threshold: 0.35 });
  videoObserver.observe(companyVideo);
} else if (companyVideoFrame) {
  companyVideoFrame.src = companyVideoFrame.dataset.src;
  companyVideo.classList.add("is-playing");
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
