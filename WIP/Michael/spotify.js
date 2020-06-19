import React, { useState, useEffect } from 'react';
//import axios from 'axios';

var Spotify = require('spotify-web-api-js');
var s = new Spotify();

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('def6b6d2f1c549d6a53e5bd5e702e7a9');
spotifyApi.setPromiseImplementation(Q);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
});

// get Elvis' albums, using Promises through Promise, Q or when
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
  function (data) {
    console.log('Artist albums', data);
  },
  function (err) {
    console.error(err);
  }
