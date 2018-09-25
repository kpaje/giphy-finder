peopleArray = [
    'Rihanna',
    'Dr. Dre',
    '50 Cent',
    'P!nk',
];

var assemble = {
    buttons: function (button, index, array) {
        button.addClass('gifButton btn btn-danger mb-2');
        button.attr('data-person', array[index]);
        button.text(array[index]);
    },
    gifs: function (results, index, gifDiv) {
        //set attributes before prepending
        var animated = results[index].images.fixed_height.url;
        var still = results[index].images.fixed_height_still.url;
        var personImage = $('<img>');
        personImage.attr('src', results[index].images.fixed_height.url);
        personImage.attr({
            'src'          : still,
            'data-still'   : still,
            'data-animate' : animated,
            'data-state'   : 'still',
            'class'        : 'gif',
        });
        gifDiv.append(personImage);
        $('#gifs').prepend(gifDiv);
    },
    rating: function (results, index, gifDiv) {
        var rating = results[index].rating;
        var text = $('<p>').text('Rating: ' + rating);
        gifDiv.append(text);
    },
};

var actions = {
    queryURL: function (query) {
        //partitioned url for future changes
        let person = $(query).attr('data-person');
        let imageCount = '&limit=' + 10;
        const apiKey = '&api_key=dc6zaTOxFJmzC';
        const giphySearch = 'https://api.giphy.com/v1/gifs/search?q=';
        let result = giphySearch + person + apiKey + imageCount;
        return result;
    },
    addButtons: function (array) {
        $('.gifButton').remove();
        for (var i = 0; i < array.length; i++) {
            var button = $('<button>');
            assemble.buttons(button, i, array);
            $('#newButton').append(button);
        };
    },
    addGifs: function (results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== 'r') {
                var gifDiv = $('<div>');
                assemble.rating(results, i, gifDiv)
                assemble.gifs(results, i, gifDiv)
            };
        };
    },
    setAsActive: function (button) {
        //reset all gifs according to data-person attribute
        $('#gifs').empty();
        $('.gifButton').removeClass('active');
        $(button).addClass('active');
    },
    animateGif: function (gif) {
        $(gif).attr('src', $(gif).attr('data-animate'));
        $(gif).attr('data-state', 'animate');
    },
    pauseGif: function (gif) {
        $(gif).attr('src', $(gif).attr('data-still'));
        $(gif).attr('data-state', 'still');
    },
    mariahTroll: function () {
        // And don't you dare say it isn't true
        // As long as that song's gettin' airplay I'm dissin' you
        // I'm a hair away from getting carried away and getting sued
        // I was gonna stop at sixteen, that was thirty-two
        // This is thirty-four bars, we ain't even third of the way through
        var mariahTroll = $('<button class="gifButton btn btn-danger mb-2" data-person="jk">Mariah Carey</button>')
        $('#newButton').append(mariahTroll);
    },
};

var handlers = {
    generateGifs: $(document).on('click', '.gifButton', function () {
        actions.setAsActive(this);
        $.ajax({
            url: actions.queryURL(this),
            method: 'GET'
        })
        .then(function (response) {
            var results = response.data;
            actions.addGifs(results);
        });
    }),
    toggleGif: $(document).on('click', '.gif', function () {
        var state = $(this).attr("data-state");
        if (state === 'still') {
            actions.animateGif(this);
        } else {
            actions.pauseGif(this);
        };
    }),
    submitButton: $(document).on('click', '#submit', function (event) {
        event.preventDefault();
        var input = $('#input').val();
        if (input.length > 2) {
            peopleArray.push(input);
            actions.addButtons(peopleArray);
            $('#input').val('');
        };
    }),
};

actions.addButtons(peopleArray);
actions.mariahTroll();