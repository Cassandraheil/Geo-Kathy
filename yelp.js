// Yelp API

//----- Client ID
// Eiyd76vi4ZJ83F7OLxOqcw

var apiKey = s26eVOVmND4ugPIyW1wsGPDv - vZIpYFXvHCWCWjhs_kQuldjsxZic9g9yA4eQSK_azDtN6f0rt_dSq36RRL7R_WRmeXFDwBmi96KNcekl - aYnP9lcHxb_BV7VNi6XnYx;
var term = "restaurant";
var place = "zipcode";
var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + place;

$.ajax({
    url: corsAnywhereUrl + queryURL,
    method: "GET",
    headers: {
        "Authorization": "Bearer " + apiKey
    }
}).then(function (response) {
    console.log("this is response", response);
    rrCall(response);
});
