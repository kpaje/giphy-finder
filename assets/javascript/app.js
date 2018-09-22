var actions = {
    queryURL: function(query) {
        let person = $(query).attr('data-person');
        let imageCount = '&limit=' + 10;
        const apiKey = '&api_key=dc6zaTOxFJmzC';
        const giphySearch = 'https://api.giphy.com/v1/gifs/search?q=';
        let result = giphySearch + person + apiKey  + imageCount;
	    return result;
    },

    prependGifs: function(results, i, gifDiv) {
        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);
        personImage.attr({
            "src": results[i].images.original.url,
            "data-still": results[i].images.original_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "still",
            "class": "gif"
        });
        gifDiv.append(personImage);
        $("#gifs").prepend(gifDiv);
    },

    appendRating: function(results, i, gifDiv) {
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        gifDiv.append(p);
    },

    generateGifs: function(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var gifDiv = $("<div>");
                this.appendRating(results, i, gifDiv)
                this.prependGifs(results, i, gifDiv)
            };
        };
    },
};

var handlers = {
    generateGifs: $(".gifButton").on("click", function () {
        $.ajax({
            url: actions.queryURL(this),
            method: "GET"
        })
        .then(
            function(response) {
                var results = response.data;
                actions.generateGifs(results);
            });
    }),

    animateOrPauseGif: $(".gif").hover(function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
      }),

    addButton: $('#submit').on("click", function () {
        var button = $('<button>');
        var input = $('.form-control').val();
        button.text(input);
        button.addClass('gifButton btn btn-danger mb-2');
        button.attr('data-person', input);
        $('#newButton').append(button);
        event.preventDefault();
    })
}






