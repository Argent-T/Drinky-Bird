var cocktailSearch = document.querySelector("#searchbox");




var ingredient = ""


listIngredients();

function searchcocktail(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ ingredient
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Category list: " +response);


    });
}

function listIngredients(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Ingredients list: " +response);


    });
}
function listCategory(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Category list: " +response);


    });
}

