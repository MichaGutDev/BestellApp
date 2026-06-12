// GLOBAL VARIABLES

let basketItems = [];
const DELIVERY_FEE = 4.99;

// INIT

function init() {
    renderDishes();
    renderBasket();
}

// RENDER FUNCTIONS

function renderDishes() {
    renderCategory("burger", "burgers-list");
    renderCategory("pizza", "pizza-list");
    renderCategory("salad", "salads-list");
}

function renderCategory(category, dishListId) {
    let dishList = document.getElementById(dishListId);

    let categoryDishes = dishes.filter(dish => dish.category === category);

    dishList.innerHTML = "";

    for (let index = 0; index < categoryDishes.length; index++) {
        dishList.innerHTML += getDishTemplate(
            categoryDishes[index],
            index);

    }
}

function renderBasket() {
    const basketList = document.getElementById("basket-list");
    const basketSummary = document.getElementById("basket-summary");
    const buyButton = document.getElementById("buy-button");

    basketList.innerHTML = "";
    basketSummary.innerHTML = "";

    if (basketItems.length === 0) {
        basketList.innerHTML = getEmptyBasketTemplate();
        buyButton.classList.add("d-none");
    }
    else {
        for (let index = 0; index < basketItems.length; index++) {
            basketList.innerHTML += getBasketItemTemplate(basketItems[index], index);
        }

        let subtotal = calculateSubtotal();
        let total = calculateTotal();

        basketSummary.innerHTML = getBasketSummaryTemplate(
            subtotal,
            DELIVERY_FEE,
            total
        );

        buyButton.innerHTML = `Jetzt kaufen (${total.toFixed(2)}€)`;
        buyButton.classList.remove("d-none");
    }

    updateMobileBasketCounter();
}

function updateMobileBasketCounter() {
    const mobileBasketCounter = document.getElementById("mobile-basket-counter");
    const amount = calculateBasketItemAmount();

    mobileBasketCounter.innerHTML = amount;
}

// EVENT FUNCTIONS

function addToBasket(index) {
    let selectedDish = dishes[index];

    let dishAlreadyExists = false;
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name === selectedDish.name) {
            basketItems[index].amount++;
            dishAlreadyExists = true;
        }

    }

    if (dishAlreadyExists === false) {
        basketItems.push({ ...selectedDish, amount: 1 });
    }

    renderBasket();
    renderDishes();
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

    basketArea.classList.toggle("basket-area-open");
    orderBasket.classList.remove("d-none");
}

// HELPER FUNCTIONS

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

