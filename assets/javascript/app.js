$(document).ready(function () {

  // Initial array of animal items to search on 
  let animalArray = ["dog"];

  // Function for rendering animal buttons
  function renderButtons() {

    // Deleting the previous buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (let i = 0; i < animalArray.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      let a = $("<button>");
      // Adding animal and btn class
      a.addClass("animal");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-critter", animalArray[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(animalArray[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }


  // This function handles events where one button is clicked
  $("#add-animal").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    let animal = $("#animal-input").val().trim();
    // animal input from the textbox is then added to animalArray array
    animalArray.push(animal);

    // calling renderButtons which handles the processing of our animal array renderButtons();
    renderButtons();
// emptyGifs();
    animalClick();
  });


 


  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

  animalClick(); 


  //empty previous gifs using empty() function

function emptyGifs() {
  
  $("#gifs-appear-here").empty();
  // $(".imageClass").remove();
}

// this function will display funny random animal giphys when you click on the specific animal button

// this code was based upon wk 6 , activity 13, button-trigger AJAX
  function animalClick(){ 
    
  $(".animal").on("click", function () {

    emptyGifs();

    let animal = $(this).attr("data-critter");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=aTWv3RucDbeLALuro6mLkPuHuTvdhzov&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        let results = response.data;

        for (let i = 0; i < results.length; i++) {
          let gifDiv = $("<div>");

          let rating = results[i].rating;

          let p = $("<p>").text("Rating: " + rating);

          let animalImage = $("<img>");
          animalImage.addClass("imageClass");
          animalImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(animalImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

}  
// end of animalClick function ()

});