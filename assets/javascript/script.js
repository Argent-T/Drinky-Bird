function cityId(userInput) {
    var queryUrl = "https://developers.zomato.com/api/v2.1/cities?q=" + userInput + "&apikey=c84e048789ec9a53e0f00f907abe7d09";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.location_suggestions[0].id);
        var cityId = response.location_suggestions[0].id;
        searchCity(cityId);
    });
};



function searchCity(cityId) {
    var queryUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city&q=bars&count=5&establishment_type=7&apikey=c84e048789ec9a53e0f00f907abe7d09";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.restaurants[0].restaurant.events_url);
        // finding the images inside the array
        for (var i = 0; i < response.restaurants.length; i++) {
            var box = $('<div class="boxes" id="box-' + i + '">');
            var right = $('<div class="pies" id="pie-' + i + '">');
            var name = $("<h4>").addClass("Name").text(response.restaurants[i].restaurant.name);
            var phone = $("<div>").addClass("Phone").text('Phone Number: ' + response.restaurants[i].restaurant.phone_numbers);
            var barURL = $("<a>").addClass("URL").text('Click Here for More Information ').attr("href", response.restaurants[i].restaurant.events_url);
            var img = $("<img>").addClass("Image2").attr("src", response.restaurants[i].restaurant.featured_image);
            var ratings = $("<div>").addClass("Ratings").text('Rating: ' + response.restaurants[i].restaurant.user_rating.aggregate_rating);
            var address = $("<div>").addClass("Locations").text('Address: ' + response.restaurants[i].restaurant.location.address);
            //go find the id in html
            console.log(barURL);

           
            right.append(name, phone, barURL, ratings, address);
            box.append(img);
           
            box.append(right);
            $("#displayBox").append(box)
            
        }
    });
};

$("#searchCity").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var userInput = $("#userInput").val().trim();
    console.log(userInput);
    // Running the searchBandsInTown function(passing in the artist as an argument)
    cityId(userInput);
});

function clear() {
    $("#displayBox").empty();
}
// .on("click") function associated with the Search Button
$("#searchCity").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    // event.preventDefault();
    var queryUrl = "https://developers.zomato.com/api/v2.1/cities?q=" + userInput + "&apikey=c84e048789ec9a53e0f00f907abe7d09";
    // Empty the region associated with the articles
    clear();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then();
});