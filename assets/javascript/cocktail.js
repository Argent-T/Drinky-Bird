var cocktailSearch = document.querySelector("#searchName");
var searchInput = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredientUL");
var measurementList = document.querySelector("#measureUL");
var instructionText = document.querySelector("#instructions");
var drinkImage = document.querySelector("#drinkimage");
var letterbutton = document.querySelectorAll(".lB");

var ingredient = "vodka"




// Search by name button and enter key //////////////////////////////////////////////////////////////////////////
document.querySelector("#searchNameButton").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#letterlist").innerHTML = "";
    cocktailName = searchInput.value.trim();
    if (cocktailName !== "") {
        searchByName(cocktailName);
    }
    else { return }
});

searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
        cocktailName = searchInput.value.trim();
        if (cocktailName !== "") {
            searchByName(cocktailName);
        }
        else { return }
    }
    else { return }
})

// Search by name Function/////////////////////////////////////////////////////////////////////////////////

function searchByName(cocktailName) {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("cocktail");
        console.log(response);
        // make error resolution better later////////////////////////
        if (response.drinks == null) {
            alert("not found")
            return;
        }
        else {
            instructions = response.drinks[0].strInstructions;
            console.log(instructions);
            instructionText.textContent = instructions;
            drinkImage.src = response.drinks[0].strDrinkThumb;
            var ingredients = [];
            var measurements = [];


            for (i = 1; i < 16; i++) {
                if (response.drinks[0][`strIngredient${i}`] !== null) {
                    ingredients.push(response.drinks[0][`strIngredient${i}`]);
                }
                if (response.drinks[0][`strMeasure${i}`] !== null) {
                    measurements.push(response.drinks[0][`strMeasure${i}`]);
                }
            }

            console.log("ingredients");
            console.log(ingredients);
            console.log("measurements");
            console.log(measurements);
            ingredientList.innerHTML = "";
            measurementList.innerHTML = "";
            for (i = 0; i < ingredients.length; i++) {
                var ing = ingredients[i];
                var liIngredient = document.createElement("li");
                liIngredient.textContent = ing;
                ingredientList.appendChild(liIngredient);

            }
            for (i = 0; i < measurements.length; i++) {
                var mes = measurements[i];
                var liMeasure = document.createElement("li");
                liMeasure.textContent = mes;
                measurementList.appendChild(liMeasure);
            }

        }
    });
}

// SEARCH BY LETTER function////////////////////////////////////////////////////
$(".lB").on("click", function () {
    document.querySelector("#letterlist").innerHTML = "";
    var letter = $(this).attr("data-letter");
    searchByLetter(letter);
    var drinkList = [];
    var drinkListImage = [];
    function searchByLetter() {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("list by letter")
            console.log(response);
            for (i = 0; i < response.drinks.length; i++) {
                drinkList.push(response.drinks[i].strDrink);
                drinkListImage.push(response.drinks[i].strDrinkThumb);
            }
            console.log(drinkList);
            console.log(drinkListImage);
            for (i = 0; i < drinkList.length; i++) {
                var letterListName = drinkList[i];
                var letterListImage = drinkListImage[i];
                var li = document.createElement("li");
                li.innerHTML = '<div class="imgcontainer"> <img class="drinkListLink" data-name="' + letterListName + '" src= "' + letterListImage + '" alt="' + letterListName + '" style ="width: 200px;"> <div class = "imageText">' + letterListName + '</div></div>'
                document.querySelector("#letterlist").appendChild(li);
            }
        });

    }

});

$(document).on("click",".drinkListLink", function () {
    console.log("click");
    document.querySelector("#letterlist").innerHTML = "";
    var cocktailName = $(this).attr("data-name");
    console.log(cocktailName)
    searchByName(cocktailName);
})








// API parts for use later ////////////////////////////////////////////////////////////////////////
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


