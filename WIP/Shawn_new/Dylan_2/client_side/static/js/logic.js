
// Creating map object
var myMap = L.map("map", {
	center: [30, -10],
	zoom: 3
});

let country = [];
let lats = [];
let longs = [];
let country_uri = [];

// Adding tile layer to the map
L.tileLayer(MAP_URL, {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	maxZoom: 18,
	minZoom: 2,
	id: 'mapbox/streets-v11',
	accessToken: API_KEY
}).addTo(myMap);

d3.csv("/static/js/LatLong.txt", function(data) {
	console.log(data);
    for(var i = 0; i < data.length; i++){
    	country.push(data[i].Country);
    	lats.push(data[i].Latitude);
		longs.push(data[i].Longitude);
		country_uri.push(data[i].Playlist);
	}
	
	var myFeatureGroup = L.featureGroup().addTo(myMap).on("click", groupClick);
	var marker, playlist, latlng;

    for(var j = 0; j < lats.length; j++){
		latlng = L.latLng(lats[j], longs[j]);
		playlist = country_uri[j];
		marker = L.marker(latlng).addTo(myFeatureGroup)
		.bindPopup("<a href = #section2 >" + country[j] + "</a>");
		marker.playlist = playlist;
	};

	function groupClick(event) {
		var uri = event.layer.playlist;
		console.log(uri);
		var embed_play = document.getElementById('playlist');
		var iframe = document.createElement('iframe');
		iframe.src = "https://open.spotify.com/embed/playlist/" + uri;
		embed_play.appendChild(iframe);
		d3.json("/static/js/data.json", function(error, data){
			// console.log(data);
			topsongs = data;
			for (var play_list in topsongs){
				if (uri == play_list){
					console.log(topsongs[play_list]);
					console.log(topsongs[play_list][0]);
					console.log(topsongs[play_list][0]['danceability']);

					// song1 
					var song1 = document.getElementById('song1');

					var song1_chart = new Chart(song1, {
						type: 'polarArea',
						data:{
							labels:['Danceability','Energy','Valence','Acousticeness','Instrumentalness','Liveness','Speechiness'],
							datasets:[{
								data:[topsongs[play_list][0]['danceability'],topsongs[play_list][0]['energy'],topsongs[play_list][0]['valence'],topsongs[play_list][0]['acousticness'],topsongs[play_list][0]['instrumentalness'],topsongs[play_list][0]['liveness'],topsongs[play_list][0]['speechiness']],
								backgroundColor: [
									"rgba(45, 227, 240, 0.5)",
									"rgba(60, 227, 188 0.5)",
									"rgba(75, 227, 126, 0.5)",
									"rgba(90, 227, 84, 0.5)",
									"rgba(161, 212, 242, 0.5)",
									"rgba(73, 59, 227, 0.5)",
									"rgba(59, 168, 227, 0.5)"
								  ]
							}]
						},
						options: {
							title: {
								display: true,
								text: `Number 1 Song`
							}
						}
					});

					// song2 

					var song2 = document.getElementById('song2');

					var song2_chart = new Chart(song2, {
						type: 'polarArea',
						data:{
							labels:['Danceability','Energy','Valence','Acousticeness','Instrumentalness','Liveness','Speechiness'],
							datasets:[{
								data:[topsongs[play_list][1]['danceability'],topsongs[play_list][1]['energy'],topsongs[play_list][1]['valence'],topsongs[play_list][1]['acousticness'],topsongs[play_list][1]['instrumentalness'],topsongs[play_list][1]['liveness'],topsongs[play_list][1]['speechiness']],
								backgroundColor: [
									"rgba(45, 227, 240, 0.5)",
									"rgba(60, 227, 188 0.5)",
									"rgba(75, 227, 126, 0.5)",
									"rgba(90, 227, 84, 0.5)",
									"rgba(161, 212, 242, 0.5)",
									"rgba(73, 59, 227, 0.5)",
									"rgba(59, 168, 227, 0.5)"
								  ]
							}]
						},
						options: {
							title: {
							display: true,
							text: 'Top Song Number 2'
						}}
					});
				}
			}

		});
	}
});


d3.json("/static/js/data.json", function(error, data){
	console.log(data);

	
	// topsongs = data;
	// console.log(Object.values(data));
	var i = 0;
	var dance = [];
	var energy = [];
	for (var play_list in data){
		// console.log(data[play_list]);
		// console.log(data[play_list][0]['danceability']);
		var song_dance = data[play_list][0]['danceability'];
		var song_energy = data[play_list][0]['energy'];
		energy.push(song_energy);
		dance.push(song_dance);
		i = i + 1;
	}

	console.log(dance);
	// var dance_graph = document.getElementById('danceability');

	// 	var dance_chart = new Chart(dance_graph, {
	// 		type: 'bubble',
	// 		data:{},						
	// 		options: {}
	// 	});

	var trace = {
		x: dance,
		type: 'histogram',
		marker: {
			color: 'darkcyan'
		}
	  };
	  var layout = {
		title: 'Danceability In Number #1 Song In Every Country',
		xaxis: {
		  	title: 'Danceability in Song',
		},
		yaxis: {
			title: 'Frequency'
		},
		
		paper_bgcolor:"#FFF3"

	}

	var graph = [trace];
	Plotly.newPlot('danceability', graph, layout);

	var trace2 = {
		x: energy,
		type: 'histogram',
		marker: {
			color: 'darkcyan'
		}
	  };
	  var layout2 = {
		title: 'Energy In Number #1 Song In Every Country',
		xaxis: {
		  	title: 'Energy in Song',
		},
		yaxis: {
			title: 'Frequency'
		},
		paper_bgcolor:"#FFF3" 
	}
	var graph2 = [trace2];
	Plotly.newPlot('energy', graph2, layout2);


});

