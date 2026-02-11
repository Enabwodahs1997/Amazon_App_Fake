import "../style.css";
import "./checkout.css";

const TAX_RATE = 0.09;
const SHIPPING_COST = 5.99;
// Turn any text into a usable whole number (at least 1).
const parseQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
        return 1;
    }
    return Math.max(1, parsed);
};

// Read the quantity text from the page.
const readQuantity = (valueEl) => {
    return parseQuantity(valueEl.textContent);
};

// Write the quantity number back to the page.
const writeQuantity = (valueEl, nextValue) => {
    valueEl.textContent = String(parseQuantity(nextValue));
};

// Convert a price like "$29.99" into 29.99.
const parsePrice = (value) => {
    const normalized = value.replace(/[^0-9.]/g, "");
    const parsed = Number.parseFloat(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
};

const formatCurrency = (value) => `$${value.toFixed(2)}`;

// Wire up the plus/minus buttons once the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
    // Order summary elements (right side of the page).
    const itemsRow = document.querySelector(".order-summary .summary-row");
    const itemsLabel = itemsRow ? itemsRow.querySelector("span") : null;
    const orderItemsEl = document.querySelector(".order-items");
    const orderShippingEl = document.querySelector(".order-shipping");
    const orderTaxEl = document.querySelector(".order-tax");
    const orderTotalEl = document.querySelector(".order-total");

    // Recalculate subtotal, tax, shipping, and total.
    const recalcSummary = () => {
        const cartItems = Array.from(document.querySelectorAll(".cart-item"));
        let itemsCount = 0;
        let itemsTotal = 0;

        cartItems.forEach((item) => {
            const priceEl = item.querySelector(".price");
            const qtyEl = item.querySelector(".qty-value");

            if (!priceEl || !qtyEl) {
                return;
            }

            const quantity = readQuantity(qtyEl);
            const unitPrice = parsePrice(priceEl.textContent);

            itemsCount += quantity;
            itemsTotal += unitPrice * quantity;
        });

        const shipping = itemsCount > 0 ? SHIPPING_COST : 0;
        const tax = itemsTotal * TAX_RATE;
        const total = itemsTotal + shipping + tax;

        if (itemsLabel) {
            itemsLabel.textContent = `Items (${itemsCount}):`;
        }
        if (orderItemsEl) {
            orderItemsEl.textContent = formatCurrency(itemsTotal);
        }
        if (orderShippingEl) {
            orderShippingEl.textContent = formatCurrency(shipping);
        }
        if (orderTaxEl) {
            orderTaxEl.textContent = formatCurrency(tax);
        }
        if (orderTotalEl) {
            orderTotalEl.textContent = formatCurrency(total);
        }
    };

    // Add click handlers for every cart item.
    document.querySelectorAll(".cart-item").forEach((item) => {
        const decreaseButton = item.querySelector(".qty-decrease");
        const increaseButton = item.querySelector(".qty-increase");
        const valueEl = item.querySelector(".qty-value");

        if (!decreaseButton || !increaseButton || !valueEl) {
            return;
        }

        decreaseButton.addEventListener("click", () => {
            const nextValue = readQuantity(valueEl) - 1;
            if (nextValue <= 0) {
                item.remove();
                recalcSummary();
                return;
            }
            writeQuantity(valueEl, nextValue);
            recalcSummary();
        });

        increaseButton.addEventListener("click", () => {
            writeQuantity(valueEl, readQuantity(valueEl) + 1);
            recalcSummary();
        });
    });

    // First calculation on page load.
    recalcSummary();
});

