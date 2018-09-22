var actions = {
    queryURL: function(query) {
        let person = $(query).attr('data-person');
        let imageCount = '&limit=' + 10;
        const apiKey = '&api_key=dc6zaTOxFJmzC';
        const giphySearch = 'https://api.giphy.com/v1/gifs/search?q=';
	    return giphySearch + person + apiKey  + imageCount;
    },

    generateGifs: function(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img>");

                personImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(personImage);
                $("#gifs").prepend(gifDiv);
            };
        };
    },


};


$("button").on("click", function () {
	$.ajax({
        url: actions.queryURL(this),
        method: "GET"
    })
    .then(
        function(response) {
            var results = response.data;
            actions.generateGifs(results);
        });
});

$(".gif").on("click", function () {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});