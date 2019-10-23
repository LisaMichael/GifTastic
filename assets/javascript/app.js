$(document).ready(function () {

// Initial array of giphy items to search on 
let giphyTopic = ["puppies"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the previous buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (let i = 0; i < giphyTopic.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("giph");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-topic", giphyTopic[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(giphyTopic[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}


// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  let giphyTopic = $("#topic-input").val().trim();
  // The movie from the textbox is then added to our array
  giphyTopic.push(giph);

  // calling renderButtons which handles the processing of our movie array renderButtons();
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

});