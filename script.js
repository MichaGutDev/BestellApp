// GLOBAL VARIABLES

let basketItems = [];

// INIT

function init() {
    renderDishes();
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

    basketList.innerHTML = "";

    for (let index = 0; index < basketItems.length; index++) {
        basketList.innerHTML += getBasketItemTemplate(basketItems[index]);
        
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

}

// HELPER FUNCTIONS

function getButtonLabel() {
    return "Add to basket";
}
