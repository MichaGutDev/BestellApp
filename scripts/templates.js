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

function getBasketItemTemplate(basketItem) {
  return /*html*/ `
    <article class="basket-item">
      <p class="basket-item-name">
        ${basketItem.amount} x ${basketItem.name}
      </p>

      <div class="basket-item-bottom">
        <div class="basket-item-controls">
          <button type="button" class="delete-btn">
            <img src="./assets/icons/delete.svg" alt="Gericht entfernen">
          </button>
          <span>${basketItem.amount}</span>
          <button type="button">+</button>
        </div>

        <data class="basket-item-price" value="${basketItem.price}">
          ${basketItem.price.toFixed(2)}€
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