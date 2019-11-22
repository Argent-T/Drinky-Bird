var cocktailSearch = document.querySelector("#searchbox");
var ingredientList = document.querySelector("#ingredientUL");
var measurementList = document.querySelector("#measureUL");


var ingredient = ""
var cocktailName = "whiskey sour"

// buttonName.addEventListener("click", function (event) {
//     event.preventDefault();
//     ingredient


// });
searchByName();

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

            var liIngredient = document.createElement("li");
            liIngredient.textcontent = ing;
            ingredientlist.appendChild(liIngredient);

        }


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



// listIngredients();
// listCategory();


