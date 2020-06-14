// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 3
});

let country = [];
let lats = [];
let longs = [];

// Adding tile layer to the map
L.tileLayer(MAP_URL, {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
   id: 'mapbox/streets-v11',
  accessToken: API_KEY
}).addTo(myMap);

d3.csv("/static/js/LatLong.txt", function(data) {
	console.log(data);
    for(var i = 0; i < data.length; i++){
    	//console.log(data[i].Latitude);
    	country.push(data[i].Country);
    	lats.push(data[i].Latitude);
    	longs.push(data[i].Longitude);
    }
    //console.log(lats);

    for(var j = 0; j < lats.length; j++){
	var latlng = L.latLng(lats[j], longs[j]);
	L.marker(latlng)
	.bindPopup("<a href = " + data[j].Playlist + ">" + country[j] + "</a>")
	.addTo(myMap);
};
});

