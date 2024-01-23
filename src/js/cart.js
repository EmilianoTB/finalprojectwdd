import {
  getLocalStorage,
  removeItemFromLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const element = document.querySelector(".product-list");
  // Make sure cart exists
  if (cartItems == null) {
    element.innerHTML = "";
  } else {
    renderListWithTemplate(
      cartItemTemplate,
      element,
      cartItems,
      "afterbegin",
      true
    );
  }
}

function removeFromCart(id) {
  let key = "so-cart"; // Would love global definition
  removeItemFromLocalStorage(key, id);

  // End by rendering the cart again to update changes
  renderCartContents();
  getTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-remove__button" data-id="${item.Id}">Remove</button>
  </li>`;

  return newItem;
}

document.getElementById("cart-list").addEventListener("click", (e) => {
  // e.target is clicked element
  // verify it is a button
  if (e.target && e.target.nodeName == "BUTTON") {
    // Use data-id to remove that item from the cart
    removeFromCart(e.target.getAttribute("data-id"));
  }
});

function getTotal() {
  let totals = [];
  let sum = 0;
  let list = getLocalStorage("so-cart");
  if (list != null) {
    list.forEach((item) => {
      totals.push(item.FinalPrice);
    });
    for (let i = 0; i < totals.length; i++) {
      sum += totals[i];
    }

    document.querySelector(".hide").classList.remove("hide");
    document.querySelector(".cart-total").innerHTML = `Total: ${sum}`;
  }
}

renderCartContents();
getTotal();

loadHeaderFooter(
  "header",
  "footer",
  "../public/partials/header.html",
  "../public/partials/footer.html"
);
