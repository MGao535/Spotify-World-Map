// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 3,
});

let country = [];
let lats = [];
let longs = [];


// Adding tile layer to the map
L.tileLayer(MAP_URL, {
  attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  accessToken: API_KEY,

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
	.bindPopup("<a href = #section2 >" + country[j] + "</a>")
	.addTo(myMap);
};
});
console.log("Refresh1")
