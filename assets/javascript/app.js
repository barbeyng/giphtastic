// Empty array for gifs
var gifs = ["Doritos", "Pizza Rolls", "McDonalds", "Popcorn", "Oreos",
    "Cheetos", "Fries", "Gummy Bears", "Grilled Cheese", "Mac and Cheese",
    "Donuts", "Chips", "Pizza", "Chocolate", "Cookies", "Chicken Wings",
    "Burrito", "Hot Dogs", "Tacos", "Mountain Dew", "Ramen"];

// function to display the gifs on the DOM
function displayGifs() {
    var junkSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UR8T4YZEkH8hyRwb0t1SelWnIJQ84ddw&q=" + junkSearch + "&limit=5&offset=0&rating=PG-13&lang=en";
    // Creating an AJAX call to pull info from API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // create a loop through the gif array
        var gif = response.data
        for (i = 0; i < gif.length; i++) {
            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");
            // Storing the rating data
            var rating = gif[i].rating;
            // Creating an element to have the rating displayed
            var displayRating = $("<p>").text("Rating: " + rating);
            // Displaying the rating
            gifDiv.append(displayRating);
            $("#images-view").append(displayRating);
            // Retrieving the URL for the image
            var imgURL = gif[i].images.fixed_height.url;
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            // assign animated and still image versions as attributes 
            image.attr("data-animate", gif[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.attr("data-still", gif[i].images.fixed_height_still.url);
            image.attr("class", "gif");
            // Appending the image
            gifDiv.append(image);
            $("#images-view").append(image);
            // Putting the gifs beneath the buttons
            $("#buttons-view").prepend(gifDiv);
        }

        // add on click function to pause / play gif
        $(".gif").on("click", function () {
            var $img = $(this);
            var state = $img.attr("data-state");
            if (state === "still") {
                var animated_gif_url = $img.attr("data-animate");
                $img.attr({ "src": animated_gif_url, "data-state": "animate" });
            } else {
                var still_gif_url = $img.attr("data-still");
                $img.attr({ "src": still_gif_url, "data-state": "still" });
            }
        });
    });

}


// Function for displaying movie data
function createButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var button = $("<button>");
        // Adding a class of movie-btn to our button
        button.addClass("gif-btn");
        // Adding a data-attribute
        button.attr("data-name", gifs[i]);
        // Providing the initial button text
        button.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(button);
    }
}

// This function handles events where a new gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var junkSearch = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    gifs.push(junkSearch);

    // Calling createButtons which handles the processing of our gif array
    createButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifs);


// Calling the createButtons function to display the intial buttons
createButtons();

