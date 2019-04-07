// initialize array of search terms
var queries = [];

// function to create buttons with search terms
function createButtons() {

    // if there no local storage saved, show only default buttons
    if (localStorage.getItem('queries-array') === null) {
        queries = ["love", "kiss", "i'm hungry", "hurry", "please", "i miss you", "give me attention"];

        // if there is relevant local storage present, use saved data as array to show buttons
    } else {
        queries = JSON.parse(localStorage.getItem('queries-array'));
    };

    // clears any existing buttons
    $('.button-container').empty();

    // for each item in array, create button with numbered term attribute
    for (var i = 0; i < queries.length; i++) {
        var queryButton = $('<button>');
        queryButton.addClass('query-button')
            .attr('term', queries[i])
            .text(queries[i]);
        $('.button-container').append(queryButton);
    }

    // create a button to clear saved searches
    var clearButton = $('<button>');
    clearButton.addClass('clear-button')
        .text('clear saved searches');

    // appends clear button last
    $('.button-container').append(clearButton);

    // when clear button clicked, run clearStorage function
    $(document).on('click', '.clear-button', clearStorage);
};


// any button with .query-button class will displayGifs when clicked
$(document).on('click', '.query-button', displayGifs);

// clearStorage functions for clear search button
function clearStorage() {
    event.preventDefault();
    localStorage.clear();
    createButtons();
};

// when input submit button clicked, input text is added to queries array
$('#add-term').on('click', function (event) {

    event.preventDefault();

    // input saved as variable
    var newTerm = $('#new-search').val().trim();

    // trimmed input pushed into queries array
    queries.push(newTerm);

    // save new array with added input to localstorage
    localStorage.setItem('queries-array', JSON.stringify(queries));

    // create new buttons with search input button added
    createButtons();

})

// initializing variable
var stillImg;
var apiPromise;

// function using giphy's api
// displays gifs using buttons 'term' attribute to generate appropriate query url
function displayGifs() {

    // clears current displayed gifs
    $('.gif-results').empty();

    //refers to button's attribute of 'term', which is its index in queries array
    var searchTerm = $(this).attr('term');

    // unique api key provided by api.giphy.com
    var apiKey = "j8rxgh3YbwhltESdurCeooOfEQEqjQ5G";

    // full query url including api key and search term
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm;

    // ajax function calling giphy's api and assigning variable from json promise provided
    $.ajax({
        url: queryURL
    }).then(function (response) {

        // initializing variables for display
        var gifDiv;
        var rating;
        apiPromise = response;

        // for each gif in api's json, create gif box with still gif preview and rating
        for (var i = 0; i < response.data.length; i++) {
            gifDiv = $('<div class="gif-box">');
            rating = response.data[i].rating.toUpperCase();
            stillImg = response.data[i].images.original_still.url;

            var gifImg = '<img src="' + stillImg + '" index="' + [i] + '">';

            gifDiv.append(gifImg)
                .append('Rating: ' + rating);

            $('.gif-results').append(gifDiv);
            $('.gif-box img').attr('movement', 'still')
                .addClass('gif');
        }
    })
}

// all gifs, when clicked, will switch to moving gif and change movement attr to animate
$(document).on('click', 'img.gif', function (event) {

    var movingImg;

    movingImg = apiPromise.data[$(this).attr('index')].images.original.url;
    stillImg = apiPromise.data[$(this).attr('index')].images.original_still.url;

    var movement = $(this).attr('movement');

    // if movement attr is still, onclick change to animate and show moving gif
    if (movement === 'still') {
        $(this).attr('movement', 'animate');
        $(this).attr('src', movingImg);
    } else {
        //if movement attr is still, onclick change to still and show still image
        $(this).attr('movement', 'still');
        $(this).attr('src', stillImg);
    }
});



createButtons();