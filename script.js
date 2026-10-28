"use strict";

// All navigation and project links remain usable without JavaScript.
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  mobileNav.hidden = !open;
});
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!mobileNav.hidden && !event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll(".project-card")];
const projectResult = document.querySelector(".project-result");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) visible += 1;
    });
    projectResult.textContent = `Showing ${visible} project${visible === 1 ? "" : "s"}`;
  });
});

// Curated from the public repositories and the previous portfolio.
// Private source repositories are never linked in the visitor-facing site.
const projects = {
  flowbase: {
    title: "FlowBase",
    category: "Full-stack / Project management SaaS",
    intro:
      "A team project management platform built end to end, with workspaces, collaborative task management, and subscription billing.",
    features: [
      "Separate workspaces with owner, admin, and member roles.",
      "Drag-and-drop Kanban boards, task comments, and activity logs.",
      "Team chat and organization-scoped data access.",
      "Stripe Checkout, billing webhooks, and Customer Portal.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Clerk",
      "Stripe",
      "Vercel",
    ],
    live: "https://flowbase-xyz.vercel.app",
  },
  homebase: {
    title: "HomeBase",
    category: "Full-stack / Accommodation marketplace",
    intro:
      "A platform connecting hosts and renters across Nigeria, bringing accommodation discovery, booking, and communication into one experience.",
    features: [
      "Property listings, discovery filters, and saved stays.",
      "Firebase authentication and separate host and admin tools.",
      "Paystack checkout and booking management.",
      "Real-time messaging with Socket.IO and Cloudinary image uploads.",
    ],
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Socket.IO",
      "Paystack",
      "Cloudinary",
    ],
    live: "https://home-base-project.vercel.app",
    source: "https://github.com/BigJay67/home-base-project",
  },
  mamaput: {
    title: "Mama Put",
    category: "Frontend / Restaurant website concept",
    intro:
      "A Nigerian buka-inspired website that translates the character of Lagos street-food spots into a clear, responsive web experience. A concept project, rather than a commissioned restaurant website.",
    features: [
      "Day-aware “Today’s Pot” menu built with JavaScript.",
      "A full categorized menu and a straightforward visitor journey.",
      "Bold typography and colors inspired by local buka signage.",
      "Responsive layouts and accessible menu interactions.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Google Fonts"],
    live: "https://bigjay67.github.io/mama-put/",
    source: "https://github.com/BigJay67/mama-put",
  },
  counter: {
    title: "Passenger Counter",
    category: "Early work / JavaScript learning project",
    intro:
      "An early Scrimba exercise in JavaScript fundamentals. A small project that helped connect interface elements, events, and application state. The portfolio card is a typographic illustration of the project.",
    features: [
      "Increment a passenger count using a button.",
      "Save the current count to a visible history of entries.",
      "Reset the current count after saving an entry.",
      "Practice DOM updates, event handlers, and basic state.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Vite"],
    source: "https://github.com/BigJay67/passenger-counter",
  },
};
const dialog = document.querySelector("#project-dialog");
if (typeof dialog.showModal !== "function") {
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.hidden = true;
  });
}
let dialogTrigger;
function appendExternalLink(container, href, label, primary = false) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = primary ? "button button-dark" : "text-link";
  link.textContent = label;
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.add("icon");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "use");
  arrow.setAttribute("href", "#arrow-up-right");
  icon.append(arrow);
  link.append(icon);
  container.append(link);
}
function openProject(key, trigger) {
  const project = projects[key];
  if (!project || typeof dialog.showModal !== "function") return;
  dialogTrigger = trigger;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-category").textContent = project.category;
  document.querySelector("#dialog-intro").textContent = project.intro;
  const features = document.querySelector("#dialog-features");
  const stack = document.querySelector("#dialog-stack");
  const links = document.querySelector("#dialog-links");
  features.replaceChildren();
  stack.replaceChildren();
  links.replaceChildren();
  project.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    features.append(item);
  });
  project.stack.forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    stack.append(item);
  });
  if (project.live)
    appendExternalLink(links, project.live, "Visit website", true);
  if (project.source)
    appendExternalLink(links, project.source, "View source", !project.live);
  dialog.showModal();
  dialog.scrollTop = 0;
}
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () =>
    openProject(button.dataset.project, button),
  );
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => dialogTrigger?.focus());

const copyButton = document.querySelector(".copy-email");
let copyResetTimer;
copyButton.addEventListener("click", async () => {
  const label = copyButton.querySelector(".copy-label");
  const status = document.querySelector(".copy-status");
  try {
    await navigator.clipboard.writeText("makindejames5@gmail.com");
    label.textContent = "Email copied";
    status.textContent = "Email address copied to clipboard.";
  } catch {
    label.textContent = "Use the email link";
    status.textContent =
      "Copy is unavailable. Select the email link to open your email application.";
  }
  clearTimeout(copyResetTimer);
  copyResetTimer = setTimeout(() => {
    label.textContent = "Copy email";
  }, 3000);
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
if ("IntersectionObserver" in window) {
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.dataset.nav === entry.target.id;
          link.classList.toggle("active", current);
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -60% 0px" },
  );
  document
    .querySelectorAll("section[id]")
    .forEach((section) => sectionObserver.observe(section));
}
