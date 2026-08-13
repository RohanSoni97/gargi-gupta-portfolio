document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Email copied";
    if (copyStatus) copyStatus.textContent = `${email} copied to clipboard.`;
  } catch {
    if (copyStatus) copyStatus.textContent = `Email: ${email}`;
  }
});
