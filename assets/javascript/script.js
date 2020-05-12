$(document).ready(function () {

    $("#search-btn").on("click", function () {
        const searchValue = $("#search-value").val().trim();

        searchWeather(searchValue);


    })

    function searchWeather(cityName) {

        $("#today").empty();

        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e85d398b77921ed0c04eef28b1aadb7a`
        }).then(function (response) {
            console.log(response);
            const name = response.name;
            const wind = response.wind.speed;
            const humidity = response.main.humidity;
            const temp = response.main.temp;
            const img = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;



            const titleEl = $("<h3>").addClass("card-title").text(`${name}) (${(new Date()).toLocaleDateString()})`);

            const cardEl = $("<div>").addClass("card");
            const cardBodyEl = $("<div>").addClass("card-body")

            const windEl = $("<p>").addClass("card-text").text(`Winds: ${wind} MPH`);
            const humidEl = $("<p>").addClass("card-text").text(`Humidity: ${humidity}`);
            const tempEl = $("<p>").addClass("card-text").text(`Temperature: ${temp}`);
            const imgEl = $("<img>").attr("src", img);


            titleEl.append(imgEl);
            cardEl.append(titleEl, cardBodyEl, imgEl, windEl, humidEl, tempEl);
            $("#today").append(cardEl);

            const latitude = response.coord.lat;
            const longitude = response.coord.lon;
            console.log(latitude, longitude)
            getUVIndex(latitude, longitude)
            getForecast(name);

        })
    }

    function getUVIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=e85d398b77921ed0c04eef28b1aadb7a&lat={lat}&lon={lon}"
        }).then(function (response) {
            const uvValue = response.value;
            const btnEl = $("<span>").addClass("btn btn-sm").text(uvValue);
            latitude = document.getElementId(lat)
            longitude = document.getElementById(lon)


            if (uvValue < 4) {
                btnEl.addClass("btn-success");

            }

            else if (uvValue < 6) {
                btnEl.addClass("btn-warning");
            }
            else {
                btnEl.addClass("btn-danger");
            }

            uvEl.append(btnEl);

            $("#today .card-body").append(uvEl);

        })

    }

    function getForecast(cityName) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e85d398b77921ed0c04eef28b1aadb7a`
        }).then(function (response) {



            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");

            for (var i = 0; i < response.list.length; i++) {

                var colEl = $("<div>").addClass("col-md-2");
                var cardEl = $("<card>").addClass("card");
                var cardBodyEl = $("<div>").addClass("card-body p-2");
                var titleEl = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                var imgEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
                var tempEl = $("<p>").addClass("card-text").text(`Temp: ${response.list[i].main.temp_max}`);
                var humidityEl = $("<p>").addClass("card-text").text(`Humidity: ${response.list[i].main.humidity}`)


                forecast = document.getElementById("#forecast")
                colEl = document.getElementsById("colEl")
                cardEl = document.getElementsById("cardEl")
                cardBodyEl = document.getElementsById("cardBodyEl")
                titleEl = document.getElementsById("titleEl")
                imgEl = document.getElementsById("imgEl")
                tempEl = document.getElementsById("tempEl")
                humidityEl = document.getElementsById("humidityEl")

            }


        }
        )
    }
})
