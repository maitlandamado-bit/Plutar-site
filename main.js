const CHECKOUT_LINKS = {
  starter20: "https://buy.stripe.com/8x2bJ13Yi5RQgqp5GD1oI03",
  pro200: "https://buy.stripe.com/4gM3cv3Yi1BA2zz6KH1oI04"
};

function isConfigured(url) {
  return typeof url === "string" && url.length > 0 && !url.includes("REPLACE");
}

const alertBox = document.getElementById("paymentAlert");

document.querySelectorAll(".js-pay").forEach((button) => {
  const plan = button.dataset.plan;
  const link = CHECKOUT_LINKS?.[plan];

  if (isConfigured(link)) {
    button.href = link;
    button.target = "_blank";
    button.rel = "noopener";
    return;
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (alertBox) {
      alertBox.style.display = "block";
      alertBox.textContent = "Checkout link not configured yet. Update CHECKOUT_LINKS in main.js for the $20 and $200 monthly plans.";
      return;
    }
    window.alert("Checkout link not configured yet.");
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupRevealAnimations() {
  const revealTargets = document.querySelectorAll(".hero, .section, .metric, .feature, .price-card");
  if (!revealTargets.length) return;

  const finishReveal = (el) => {
    const cleanup = () => {
      el.classList.remove("reveal-enter", "is-visible");
      el.style.removeProperty("transition-delay");
      el.removeEventListener("transitionend", cleanup);
    };
    el.addEventListener("transitionend", cleanup);
    window.setTimeout(cleanup, 1200);
  };

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal-enter");
    if (!prefersReducedMotion) {
      el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    }
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => {
      el.classList.add("is-visible");
      finishReveal(el);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        finishReveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

function attachTilt(el, maxTilt = 6) {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const tiltY = (px - 0.5) * (maxTilt * 2);
    const tiltX = (0.5 - py) * (maxTilt * 2);

    el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  });
}

function setupTiltEffects() {
  if (prefersReducedMotion) return;
  if (!window.matchMedia("(pointer:fine)").matches) return;

  const hero = document.querySelector(".hero");
  if (hero) attachTilt(hero, 3.4);

  document.querySelectorAll(".metric, .feature, .price-card").forEach((el) => {
    attachTilt(el, 5.6);
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("mousemove", (event) => {
      const rect = panel.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      panel.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
      panel.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
    });
  });
}

setupRevealAnimations();
setupTiltEffects();
