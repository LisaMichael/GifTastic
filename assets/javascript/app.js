$(document).ready(function () {

  // Initial array of animal items to search on 
  let animalArray = ["dog", "ant", "skunk"];

  // Function for rendering animal buttons
  function renderButtons() {

    // Deleting the previous buttons prior to adding new animal buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (let i = 0; i < animalArray.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.

      let a = $("<button>");
      // Adding animal and btn class
      a.addClass("animal btn");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-critter", animalArray[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(animalArray[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }


  // This function handles events where one animal button is clicked
  $("#add-animal").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    let animal = $("#animal-input").val().trim();
    // animal input from the textbox is then added to animalArray array
    animalArray.push(animal);

    // calling renderButtons which handles the processing of animal array renderButtons();
    renderButtons();


    // blank out the input field after you hit the submit button
    //I referenced: https://stackoverflow.com/questions/20416803/how-do-i-clear-the-previous-text-field-value-after-submitting-the-form-with-out

    $('#animal-form').children('input').val('');
    // emptyGifs();
    animalClick();
  });


  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

  animalClick();


  
  let animate = $(this).attr("data-animate");
  let still = $(this).attr("data-still");

  
  //empty  gifs using empty() function

  function emptyGifs() {

    $(".col-md-3").empty();
  }

  // this function will display animal giphys when you click on the specific animal button

  function animalClick() {

    // this code was based upon wk 6 , activity 13, button-trigger AJAX
    $(".animal").on("click", function () {


      // empty the previous gifs
      emptyGifs();

      let animal = $(this).attr("data-critter");

      // api query url 
      let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=aTWv3RucDbeLALuro6mLkPuHuTvdhzov&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          console.log(response);
          let results = response.data;

          for (let i = 0; i < results.length; i++) {
            let gifDiv = $("<div>");

            let rating = results[i].rating;

            let p = $("<p>").text("Rating: " + rating);

            let animalImage = $("<img>");
            animalImage.addClass("image-fluid");
            // animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("src", results[i].images.original_still.url);

            animalImage.attr("data-still", results[i].images.original_still.url);
            animalImage.attr("data-animate", results[i].images.original.url);
            animalImage.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(animalImage);

            $("#img" + i).append(gifDiv);


          }
        });

    });

  }
  // end of animalClick function ()

  

  function animateOrStill(){

    // I referenced Gem homework for the syntax of using $(this)
		let state = $(this).attr("data-state");
		let animateGiphy = $(this).attr("data-animate");
		let stillGiphy = $(this).attr("data-still");

		if (state === "still") {
			$(this).attr("src", animateGiphy);
			$(this).attr("data-state", "animate");
		}

		else if (state === "animate") {
			$(this).attr("src", stillGiphy);
			$(this).attr("data-state", "still");
		}
	}

  // i referenced https://stackoverflow.com/questions/17605296/document-onclick-not-working
  // to obtain the syntax and explanation: 
  // so the document is listening for click on class "image-fluid", and run aniate or still function
  $(document).on("click", ".image-fluid", animateOrStill);
});