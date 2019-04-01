// array of search terms
var queries = ["love", "kiss", "i'm hungry", "hurry", "please", "i miss you"];


// var gifDiv;
// var rating;
// var stillImg;
// var movingImg;
// function using giphy's api
// displays gifs using buttons 'term' attribute to generate appropriate query url
function displayGifs() {

    $('.gif-results').empty();

    //refers to button's attribute of 'term'
    var searchTerm = $(this).attr('term');

    // unique api key provided by api.giphy.com
    var apiKey = "j8rxgh3YbwhltESdurCeooOfEQEqjQ5G";

    // full query url including api key and search term
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm;

    // ajax function calling giphy's api and assigning variable from json promise provided
    $.ajax({
        url: queryURL
    }).then(function (response) {

        var gifDiv;
        var rating;
        var stillImg;
        var movingImg;

        console.log(searchTerm);
        console.log(queryURL);
        console.log(response);
        console.log(response.data.length);

                for (var i = 0; i < response.data.length; i++) {

            gifDiv = $('<div class="gif-box">');
            rating = response.data[i].rating;
            stillImg = response.data[i].images.original_still.url;

            var gifImg = '<img src="' + stillImg + '" index="' + [i] + '">';


            $('.gif-box img').attr('movement', 'still')
                .addClass('gif');


            gifDiv.append(gifImg)
                .append(rating);

            $('.gif-results').append(gifDiv);




            $(document).on('click', '.gif', function (event) {

                movingImg = response.data[$(this).attr('index')].images.original.url;
                stillImg = response.data[$(this).attr('index')].images.original_still.url;

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


        }
    })
}




function createButtons() {
    $('.button-container').empty();
    for (var i = 0; i < queries.length; i++) {
        var queryButton = $('<button>');
        queryButton.addClass('query-button')
            .attr('term', queries[i])
            .text(queries[i]);
        $('.button-container').append(queryButton);
    }

    console.log(document);
    $(document).on('click', '.query-button', displayGifs);
    
}

// when input submit button clicked, input text is added to queries array
$('#add-term').on('click', function (event) {
    event.preventDefault();

    // input saved as variable
    var newTerm = $('#new-search').val().trim();

    // input pushed into queries array
    queries.push(newTerm);

    //
    createButtons();
})


createButtons();