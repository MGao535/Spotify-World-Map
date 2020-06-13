// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 3
});

// Adding tile layer to the map
L.tileLayer(MAP_URL, {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
   id: 'mapbox/streets-v11',
  accessToken: API_KEY
}).addTo(myMap);

d3.csv("LatLong.txt").then(function(data){
  console.log(data);
})
