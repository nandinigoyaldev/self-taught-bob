document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const themeToggle = document.querySelector(".theme-toggle");
  const progressBar = document.querySelector(".scroll-progress span");
  const backToTop = document.querySelector(".back-to-top");
  const toast = document.querySelector(".toast");
  const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
  const revealItems = document.querySelectorAll(".reveal");
  const root = document.documentElement;
  const storedTheme = window.localStorage.getItem("self-taught-bob-theme");
  const emailAddress = "nandunandinigoyal@gmail.com";

  const showToast = (message) => {
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    window.localStorage.setItem("self-taught-bob-theme", theme);
  };

  setTheme(storedTheme || "light");

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast("Email copied to clipboard");
      } catch {
        showToast(`Email: ${emailAddress}`);
      }
    });
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 16);

    if (progressBar) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, progress)}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 700);
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
});
