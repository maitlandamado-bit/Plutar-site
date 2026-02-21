const CHECKOUT_LINKS = {
  starter: "https://buy.stripe.com/REPLACE_STARTER_CHECKOUT",
  growth: "https://buy.stripe.com/REPLACE_GROWTH_CHECKOUT",
  scale: "https://buy.stripe.com/REPLACE_SCALE_CHECKOUT"
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
    alertBox.style.display = "block";
    alertBox.textContent = "Checkout link not configured yet. Update CHECKOUT_LINKS in scripts/main.js with one live URL per plan.";
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
