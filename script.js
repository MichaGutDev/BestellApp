// GLOBAL VARIABLES


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

// EVENT FUNCTIONS

function getButtonLabel() {
  return "Add to basket";
}

// HELPER FUNCTIONS