import "../style.css";
import "./checkout.css";


const TAX_RATE = 0.09;
const SHIPPING_COST = 5.99;
const CART_STORAGE_KEY = "amazon_cart";
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

const getStoredCart = () => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn("Failed to read cart from storage:", error);
        return [];
    }
};

const saveStoredCart = (cartItems) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
        console.warn("Failed to save cart to storage:", error);
    }
};

const groupCartItems = (items) => {
    const grouped = new Map();

    items.forEach((item) => {
        const key = `${item.name}__${item.price}`;
        const existing = grouped.get(key);
        if (existing) {
            existing.quantity += 1;
            return;
        }
        grouped.set(key, {
            name: item.name,
            price: item.price,
            quantity: 1
        });
    });

    return Array.from(grouped.values());
};

const buildCartItemElement = (item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "cart-item";

    const image = document.createElement("div");
    image.className = "cart-item-image";

    const details = document.createElement("div");
    details.className = "cart-item-details";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = item.price;

    const controls = document.createElement("div");
    controls.className = "quantity-control";

    const minus = document.createElement("button");
    minus.className = "qty-btn qty-decrease";
    minus.type = "button";
    minus.textContent = "-";

    const qty = document.createElement("span");
    qty.className = "qty-value";
    qty.textContent = String(parseQuantity(item.quantity));

    const plus = document.createElement("button");
    plus.className = "qty-btn qty-increase";
    plus.type = "button";
    plus.textContent = "+";

    controls.append(minus, qty, plus);
    details.append(title, price, controls);
    wrapper.append(image, details);

    return wrapper;
};

const syncStorageFromDom = () => {
    const items = [];

    document.querySelectorAll(".cart-item").forEach((item) => {
        const nameEl = item.querySelector("h3");
        const priceEl = item.querySelector(".price");
        const qtyEl = item.querySelector(".qty-value");

        if (!nameEl || !priceEl || !qtyEl) {
            return;
        }

        const qty = readQuantity(qtyEl);
        for (let i = 0; i < qty; i += 1) {
            items.push({
                name: nameEl.textContent,
                price: priceEl.textContent
            });
        }
    });

    saveStoredCart(items);
};

// Wire up the plus/minus buttons once the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");

    if (cartItemsContainer) {
        const storedCart = getStoredCart();
        const groupedCart = groupCartItems(storedCart);

        cartItemsContainer.innerHTML = "";

        if (groupedCart.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "Your cart is empty.";
            cartItemsContainer.appendChild(emptyMessage);
        } else {
            groupedCart.forEach((item) => {
                cartItemsContainer.appendChild(buildCartItemElement(item));
            });
        }
    }

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
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const item = target.closest(".cart-item");
            if (!item) {
                return;
            }

            const valueEl = item.querySelector(".qty-value");
            if (!valueEl) {
                return;
            }

            if (target.classList.contains("qty-decrease")) {
                const nextValue = readQuantity(valueEl) - 1;
                if (nextValue <= 0) {
                    item.remove();
                } else {
                    writeQuantity(valueEl, nextValue);
                }
                syncStorageFromDom();
                recalcSummary();
                return;
            }

            if (target.classList.contains("qty-increase")) {
                writeQuantity(valueEl, readQuantity(valueEl) + 1);
                syncStorageFromDom();
                recalcSummary();
            }
        });
    }

    // Handle checkout button click had to have AI help me fix whatever I screwed up when trying to make this Event listener. The bugger was being stubborn and I made it more complicated than needed.
    const checkoutButton = document.querySelector(".place-order-btn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            alert("Checkout complete!");
        });
    }

    // First calculation on page load.
    recalcSummary();
});

