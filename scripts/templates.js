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
    <p>${basketItem.amout}x</p>
    <p>${basketItem.name}</p>
     <div class="basket-item-controls">
        <button type="button">🗑</button>
        <span>${basketItem.amount}</span>
        <button type="button">+</button>
      </div>
      <data value="${basketItem.price}">
        ${basketItem.price.toFixed(2)}€
      </data>  
  </article>`
}