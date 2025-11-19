// Smooth scrolling + active menu highlighting + mobile nav

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".top-nav");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = document.querySelectorAll("main .section[id]");
  const menuToggle = document.querySelector(".menu-toggle");
  const navContainer = document.querySelector(".top-nav");

  // Update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scroll when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const navHeight = nav.offsetHeight || 0;
      const offset = 16; // small spacing
      const targetPosition =
        targetEl.getBoundingClientRect().top + window.scrollY - navHeight - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      // Close mobile menu after selection
      if (navContainer.classList.contains("open")) {
        navContainer.classList.remove("open");
        if (menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Highlight active section in nav using IntersectionObserver
//   if ("IntersectionObserver" in window) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;
//           const id = entry.target.id;
//           navLinks.forEach((link) => {
//             const isActive = link.getAttribute("href").substring(1) === id;
//             link.classList.toggle("active", isActive);
//           });
//         });
//       },
//       {
//         root: null,
//         threshold: 0.25,
//         rootMargin: "0px 0px -55% 0px"
//       }
//     );

//     sections.forEach((section) => observer.observe(section));
//   }

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navContainer.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});
