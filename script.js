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
    let basketList = document.getElementById("basket-list");
    let basketSummary = document.getElementById("basket-summary");
    let buyButton = document.getElementById("buy-button");

    basketList.innerHTML = "";
    basketSummary.innerHTML = "";

    if (basketItems.length === 0) {
        basketList.innerHTML = getEmptyBasketTemplate();
        buyButton.classList.add("d-none");
    }
    else {
        for (let index = 0; index < basketItems.length; index++) {
            basketList.innerHTML += getBasketItemTemplate(basketItems[index]);
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
    console.log("Aktueller Warenkorb:", basketItems);
}

// HELPER FUNCTIONS

function getButtonLabel() {
    return "Add to basket";
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

