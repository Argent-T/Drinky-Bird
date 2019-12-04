var cocktailSearch = document.querySelector("#searchName");
var searchInput = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredientUL");
var measurementList = document.querySelector("#measureUL");
var instructionText = document.querySelector("#instructions");
var drinkImage = document.querySelector("#drinkImage");
var drinkName = document.querySelector("#drinkName");
var letterbutton = document.querySelectorAll(".lB");
var letterList = document.querySelector("#letterlist");
var caroTitle = document.querySelectorAll(".carotitle");
var caroImg = document.querySelectorAll(".caro1");




// Search by name button and enter key //////////////////////////////////////////////////////////////////////////
document.querySelector("#searchNameButton").addEventListener("click", function (event) {
    event.preventDefault();
    cocktailName = searchInput.value.trim();
    if (cocktailName !== "") {
        document.querySelector("#letterlist").innerHTML = "";
        searchByName(cocktailName);
    }
    else { return }
});

searchInput.addEventListener("keyup", function (event) {

    event.preventDefault();
    if (event.key === "Enter") {
        console.log("searchtest");
        document.querySelector("#letterlist").innerHTML = "";
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
    document.querySelector(".instruct").style.display = "flex"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log("cocktail");
        console.log(response);
        // make error resolution better later////////////////////////
        if (response.drinks == null) {
            // alert("not found")
            document.querySelector("#notfound").style.display = "inline";
            console.log("notfound");
            return;
        }
        else {
            instructions = response.drinks[0].strInstructions;
            // console.log(instructions);
            instructionText.textContent = instructions;
            drinkName.textContent = response.drinks[0].strDrink;
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

            // console.log("ingredients");
            // console.log(ingredients);
            // console.log("measurements");
            // console.log(measurements);
            // Display measurements and ingredients///////////////////////
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
    // clear rendered results
    clearAll();
    // begin search
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
            // console.log("list by letter")
            // console.log(response);
            for (i = 0; i < response.drinks.length; i++) {
                drinkList.push(response.drinks[i].strDrink);
                drinkListImage.push(response.drinks[i].strDrinkThumb);
            }
            // console.log(drinkList);
            // console.log(drinkListImage);
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

$(document).on("click", ".drinkListLink", function () {
    document.querySelector("#letterlist").innerHTML = "";
    var cocktailName = $(this).attr("data-name");
    searchByName(cocktailName);
});



// List ingredient search options///////////////////////////////////////////

var ingredientSearchList = ["Vodka", "Gin", "Rum", "Tequila", "Blended Whiskey"]
for (i = 0; i < ingredientSearchList.length; i++) {
    var option = ingredientSearchList[i];
    var li = document.createElement("li");
    li.innerHTML = '<a class="ingredientOption" data-name="' + option + '">' + option + '</a>';
    document.querySelector("#dropdown1").appendChild(li);
}
// $('.dropdown-trigger').dropdown();
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, constrainWidth = true);
});

$(document).on("click", ".ingredientOption", function () {
    clearAll();
    var ingredient = $(this).attr("data-name");
    searchIngredient(ingredient);
});


function searchIngredient(ingredient) {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient
    var drinkList = [];
    var drinkListImage = [];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log("ingredient")
        // console.log(response);
        for (i = 0; i < response.drinks.length; i++) {
            drinkList.push(response.drinks[i].strDrink);
            drinkListImage.push(response.drinks[i].strDrinkThumb);
        }
        // console.log(drinkList);
        // console.log(drinkListImage);
        for (i = 0; i < drinkList.length; i++) {
            var letterListName = drinkList[i];
            var letterListImage = drinkListImage[i];
            var li = document.createElement("li");
            li.innerHTML = '<div class="imgcontainer"> <img class="drinkListLink" data-name="' + letterListName + '" src= "' + letterListImage + '" alt="' + letterListName + '" style ="width: 200px;"> <div class = "imageText">' + letterListName + '</div></div>'
            document.querySelector("#letterlist").appendChild(li);
        }
    });
}




function clearAll() {
    searchInput.value = "";
    drinkName.textContent = "";
    ingredientList.innerHTML = "";
    measurementList.innerHTML = "";
    drinkImage.src = "";
    instructionText.textContent = "";
    document.querySelector("#letterlist").innerHTML = "";
    document.querySelector(".instruct").style.display = "none"
    document.querySelector("#notfound").style.display = "none";
    console.log("clear");
}











// API parts for use later ////////////////////////////////////////////////////////////////////////


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
// CAROUSEL initialization/////////////////////////////////////////////////
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.carousel');
//     var instances = M.Carousel.init(elems);
// });
$('.carousel.demo-carousel').carousel({
   
});


// Carousel contents///////////////////////////////////////////
carousel();
function carousel() {
    var images = [];
    var namesran = [];
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    for (i = 0; i < 4; i++) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            images.push(response.drinks[0].strDrinkThumb);
            namesran.push(response.drinks[0].strDrink);
            console.log("Random Cocktail: ")
            console.log(response);
            // console.log(images);
            console.log(namesran.length);
            
            if(namesran.length == 4){
                
                for(i = 0; i < 4; i++){
                    caroTitle[i].textContent = namesran[i];
                    caroImg[i].src = images[i];
                    caroImg[i].setAttribute("data-name",namesran[i])
                }
            }
        });
    }

}


$(document).on("click", ".caro1", function () {
    document.querySelector(".carouwrap").style.display="none";
    document.querySelector("#letterlist").innerHTML = "";
    var cocktailName = $(this).attr("data-name");
    searchByName(cocktailName);
});


