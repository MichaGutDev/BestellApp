let basketItems = [];
const DELIVERY_FEE = 4.99;

function init() {
    renderDishes();
    renderBasket();
}

function renderDishes() {
    renderCategory("burger", "burgers-list");
    renderCategory("pizza", "pizza-list");
    renderCategory("salad", "salads-list");
}

function renderCategory(category, dishListId) {
    const dishList = document.getElementById(dishListId);

    dishList.innerHTML = "";

    for (let index = 0; index < dishes.length; index++) {
        if (dishes[index].category === category) {
            dishList.innerHTML += getDishTemplate(
                dishes[index],
                index
            );
        }
    }
}

function renderBasket() {
    const basketList = document.getElementById("basket-list");
    const basketSummary = document.getElementById("basket-summary");
    const buyButton = document.getElementById("buy-button");

    clearBasketView(basketList, basketSummary);

    if (basketItems.length === 0) {
        renderEmptyBasket(basketList, buyButton);
    } else {
        renderFullBasket(basketList, basketSummary, buyButton);
    }

    updateBasketAfterRender();
}

function updateDishButton(index) {
    const dishButton = document.getElementById("dish-button-" + index);
    const dish = dishes[index];

    dishButton.innerHTML = getButtonLabel(dish);
    dishButton.className = getDishButtonClass(dish);
}

function clearBasketView(basketList, basketSummary) {
    basketList.innerHTML = "";
    basketSummary.innerHTML = "";
}

function renderEmptyBasket(basketList, buyButton) {
    basketList.innerHTML = getEmptyBasketTemplate();
    buyButton.classList.add("d-none");
}

function renderFullBasket(basketList, basketSummary, buyButton) {
    renderBasketItems(basketList);

    const subtotal = calculateSubtotal();
    const total = calculateTotal();

    basketSummary.innerHTML = getBasketSummaryTemplate(
        subtotal,
        DELIVERY_FEE,
        total
    );

    buyButton.innerHTML = `Jetzt kaufen (${total.toFixed(2)}€)`;
    buyButton.classList.remove("d-none");
}

function renderBasketItems(basketList) {
    for (let index = 0; index < basketItems.length; index++) {
        basketList.innerHTML += getBasketItemTemplate(
            basketItems[index],
            index
        );
    }
}

function updateBasketAfterRender() {
    updateMobileBasketCounter();
    closeMobileBasketIfEmpty();
}

function updateMobileBasketCounter() {
    const mobileBasketCounter = document.getElementById("mobile-basket-counter");
    const amount = calculateBasketItemAmount();

    mobileBasketCounter.innerHTML = amount;
}

function closeMobileBasketIfEmpty() {
    const basketArea = document.getElementById("basket-area");

    if (calculateBasketItemAmount() === 0) {
        basketArea.classList.remove("basket-area-open");
    }
}

function addToBasket(index) {
    let selectedDish = dishes[index];

    let isdishAlreadyExists = false;
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name === selectedDish.name) {
            basketItems[index].amount += 1;
            isdishAlreadyExists = true;
        }
    }
    
    if (isdishAlreadyExists === false) {
        basketItems.push({ ...selectedDish, amount: 1 });
    }

    renderBasket();
    updateDishButton(index);
}

function increaseBasketItemAmount(index) {
    basketItems[index].amount++;

    renderBasket();
    renderDishes();
}

function decreaseBasketItemAmount(index) {
    basketItems[index].amount--;

    renderBasket();
    renderDishes();
}

function deleteBasketItem(index) {
    basketItems.splice(index, 1)

    renderBasket();
    renderDishes();
}

function submitOrder() {
    const dialog = document.getElementById("order-confirmation")
    const orderBasket = document.getElementById("order-basket")

    orderBasket.classList.add("d-none")
    dialog.showModal();

    basketItems = [];
    renderDishes();

}

function closeOrderConfirmation() {
    const dialog = document.getElementById("order-confirmation")
    const orderBasket = document.getElementById("order-basket")

    dialog.close();
    orderBasket.classList.remove("d-none")

    renderBasket();
}

function toggleMobileBasket() {

    const basketArea = document.getElementById("basket-area");
    const orderBasket = document.getElementById("order-basket");

    if (calculateBasketItemAmount() === 0) {
        basketArea.classList.remove("basket-area-open");
        return;
    }

    basketArea.classList.toggle("basket-area-open");
    orderBasket.classList.remove("d-none");
}

function closeMobileBasket() {
    const basketArea = document.getElementById("basket-area");

    basketArea.classList.remove("basket-area-open");
}

function getButtonLabel(dish) {
    let amount = getBasketItemAmountByName(dish.name);

    if (amount === 0) {
        return "Auswählen";
    }

    return `Gewählt ${amount}`;
}

function calculateBasketItemPrice(basketItem) {
    return basketItem.price * basketItem.amount;
}

function calculateSubtotal() {
    let subtotal = 0

    for (let index = 0; index < basketItems.length; index++) {
        subtotal += calculateBasketItemPrice(basketItems[index])
    }

    return subtotal;
}

function calculateTotal() {
    return calculateSubtotal() + DELIVERY_FEE;
}

function getBasketItemTemplate(basketItem, index) {
    if (basketItem.amount === 1) {
        return getSingleBasketItemTemplate(basketItem, index);
    }

    return getMultipleBasketItemTemplate(basketItem, index);
}

function getBasketItemAmountByName(dishName) {
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name === dishName) {
            return basketItems[index].amount;
        }
    }

    return 0;
}

function getDishButtonClass(dish) {
    let amount = getBasketItemAmountByName(dish.name);

    if (amount > 0) {
        return "dish-button dish-button-selected";
    }

    return "dish-button";
}

function calculateBasketItemAmount() {
    let amount = 0;

    for (let index = 0; index < basketItems.length; index++) {
        amount += basketItems[index].amount;
    }

    return amount;
}


