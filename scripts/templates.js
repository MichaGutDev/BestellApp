function getDishTemplate(dish, index) {
  return /*html*/`
    <article class="dish-card">
      <img
        class="dish-image"
        src="${dish.imageSource}"
        alt="${dish.imageAlt}"
      />
      <div class="dish-info">
        <h4>${dish.name}</h4>
        <p>${dish.ingredients}</p>
      </div>
      <div class="dish-side">
        <data value="${dish.price}">${dish.price.toFixed(2)} €</data>
        <button
          type="button"
          onclick="addToBasket(${index})"
          aria-label="${dish.name} zum Warenkorb hinzufügen"
        >
          ${getButtonLabel(dish)}
        </button>
      </div>
    </article>
    `;
}

function getSingleBasketItemTemplate(basketItem, index) {
  return /*html*/ `
    <article class="basket-item">
      <p class="basket-item-name">
        ${basketItem.amount} x ${basketItem.name}
      </p>

      <div class="basket-item-bottom">
        <div class="basket-item-controls">
          <button onclick="deleteBasketItem(${index})" type="button" class="delete-btn">
            <img src="./assets/icons/delete.svg" alt="Gericht entfernen">
          </button>
          <span>${basketItem.amount}</span>
          <button onclick="increaseBasketItemAmount(${index})" type="button">+</button>
        </div>

        <data class="basket-item-price" value="${basketItem.price}">
          ${calculateBasketItemPrice(basketItem).toFixed(2)}€
        </data>
      </div>
    </article>
  `;
}

function getMultipleBasketItemTemplate(basketItem, index) {
  return /*html*/ `
    <article class="basket-item">
      <div class="basket-item-title">
        <p class="basket-item-name">
          ${basketItem.amount} x ${basketItem.name}
        </p>
        <button onclick="deleteBasketItem(${index})" type="button" class="delete-btn">
          <img src="./assets/icons/delete.svg" alt="Gericht entfernen">
        </button>
      </div>
      <div class="basket-item-bottom">
        <div class="basket-item-controls">
          <button onclick="decreaseBasketItemAmount(${index})" type="button">-</button>
          <span>${basketItem.amount}</span>
          <button onclick="increaseBasketItemAmount(${index})" type="button">+</button>
        </div>

        <data class="basket-item-price" value="${basketItem.price}">
          ${calculateBasketItemPrice(basketItem).toFixed(2)}€
        </data>
      </div>
    </article>
  `;
}


function getEmptyBasketTemplate() {
  return /*html*/ `
  <div class="empty-basket">
        <p class="empty-basket-text">
      Dein Warenkorb ist leer.<br>
      Wähle leckere Gerichte aus der Speisekarte.
    </p>

    <img
      class="empty-basket-icon"
      src="./assets/icons/shopping-cart-large.svg"
      alt="Leerer Warenkorb">
  </div>
  `;
}

function getBasketSummaryTemplate(subtotal, deliveryFee, total) {
  return /*html*/ `
    <table class="basket-summary-table">
  <tr>
    <th>Subtotal</th>
    <td>${subtotal.toFixed(2)}€</td>
  </tr>

  <tr>
    <th>Delivery fee</th>
    <td>${deliveryFee.toFixed(2)}€</td>
  </tr>

  <tr class="basket-summary-divider-row">
    <td colspan="2">
      <div class="basket-divider"></div>
    </td>
  </tr>

  <tr>
    <th>Total</th>
    <td>${total.toFixed(2)}€</td>
  </tr>
</table>
    `
}