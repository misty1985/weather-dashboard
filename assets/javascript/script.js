$(document).ready(function () {

    $("#search-btn").on("click", function () {
        const searchValue = $("#search-value").val().trim();


    })

    function searchWeather(cityName) {
        $.ajax({
            type: "GET"
            url: `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1c224fdbde670cb6cea8a5ff1e69b8fe`
        }).then(function () {


        })
    }

})