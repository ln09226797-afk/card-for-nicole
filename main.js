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
