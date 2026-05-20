function getDishTemplate(dish, index) {
    return html`
    <article class="dish-card">
        <img class="dish-image" src="${dish.imageSource}" alt="${dish.imageAlt}">
        <div class="dish-info">
            <h3>${dish.name}</h3>
            <p>${dish.ingredients}</p>
            <div class="dish-footer">
                <data value="${dish.price}">
                    ${dish.price.toFixed(2)} €
                </data>
                <button
                 type="button"
                 onclick="addToBasket(${index})"
                 aria-label="${dish.name} zum Warenkorb hinzufügen"
                >
                 ${getButtonLabel(dish)}
                </button>
            </div>
        </div>
    </article>
    `;
}