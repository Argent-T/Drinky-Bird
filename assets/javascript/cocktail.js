var cocktailSearch = document.querySelector("#searchbox");
var ingredientList = document.querySelector("#ingredientUL");
var measurementList = document.querySelector("#measureUL");
var instructionText = document.querySelector("#instructions");
var drinkImage = document.querySelector("#drinkimage");

var ingredient = ""



// searchByName();
// Search by NAME/////////////////////////////////////////////////////////////////////////////////
var cocktailName = "whiskey sour"
function searchByName() {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("cocktail");
        console.log(response);
        instructions = response.drinks[0].strInstructions;
        console.log(instructions);
        instructionText.textContent = instructions;
        drinkImage.src= response.drinks[0].strDrinkThumb;
        var ingredients=[];
        var measurements =[];
        
        for(i=1; i<16; i++){
            if(response.drinks[0][`strIngredient${i}`] !== null){
                ingredients.push(response.drinks[0][`strIngredient${i}`]);
            }
            if(response.drinks[0][`strMeasure${i}`] !== null){
                measurements.push(response.drinks[0][`strMeasure${i}`]);
            }
        }
        console.log("ingredients");
        console.log(ingredients);
        console.log("measurements");
        console.log(measurements);

        for(i=0; i<ingredients.length; i++){
            ing = ingredients[i];
            mes = measurements[i];
            var liIngredient = document.createElement("li");
            liIngredient.textContent = ing;
            var liMeasure = document.createElement("li");
            liMeasure.textContent = mes;
            ingredientList.appendChild(liIngredient);
            measurementList.appendChild(liMeasure);
        }
    });
}



var letter = "a"

searchByLetter();
function searchByLetter() {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("list by letter")
        console.log(response);
    });
}








function searchIngredient() {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("ingredient")
        console.log(response);
    });
}

function listIngredients() {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Ingredients list: ")
        console.log(response);
    });
}
function listCategory() {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("category list")
        console.log(response);
    });
}


// buttonName.addEventListener("click", function (event) {
//     event.preventDefault();
//     ingredient


// });


// listIngredients();
// listCategory();


