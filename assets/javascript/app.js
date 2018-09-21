$("#button").on("click", function() {
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=rihanna";
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {
        var imageUrl = response.data.image_original_url;
        var image = $("<img>");

        image.attr("src", imageUrl);
        image.attr("alt", "RI RI");

        $("#images").prepend(image);
      })
});