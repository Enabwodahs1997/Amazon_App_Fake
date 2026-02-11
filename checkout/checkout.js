import "../style.css";
import "./checkout.css";

// Normalize quantity values so we never display invalid or zero counts.
const parseQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
};

// Update the visible number in the quantity badge.
const updateQuantity = (valueEl, nextValue) => {
    valueEl.textContent = String(parseQuantity(nextValue));
};

// Wire up the plus/minus buttons once the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cart-item").forEach((item) => {
        const decreaseButton = item.querySelector(".qty-decrease");
        const increaseButton = item.querySelector(".qty-increase");
        const valueEl = item.querySelector(".qty-value");

        // Skip items that don't have the expected controls.
        if (!decreaseButton || !increaseButton || !valueEl) {
            return;
        }

        // Decrease the count, but never below 1.
        decreaseButton.addEventListener("click", () => {
            updateQuantity(valueEl, parseQuantity(valueEl.textContent) - 1);
        });

        // Increase the count by 1.
        increaseButton.addEventListener("click", () => {
            updateQuantity(valueEl, parseQuantity(valueEl.textContent) + 1);
        });
    });
});