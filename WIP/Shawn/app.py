from flask import Flask, render_template, jsonify, request
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.oauth2 as oauth2
import pprint




app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/playlist", methods = ['POST'])
def playlist():
    market = [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", 
      "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", 
      "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", 
      "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", 
      "US", "UY", "VN" ]

    CLIENT_ID = "d76e0263612746c1891673bca5220cd0"
    CLIENT_SECRET = "7c34c892933d446fae874d28b3f6a9b2"

    credentials = oauth2.SpotifyClientCredentials(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET)

    token = credentials.get_access_token()
    spotify = spotipy.Spotify(auth=token)
    #access playlist uri 
    playlist_uri = request.get_data()

    #make apicalls 
    playlist = spotify.playlist_tracks(playlist_uri, market=None, additional_types=('track', ))
    artist = playlist['items'][1]['track']['album']['artists'][0]['id']
    songs = []
    for track in range(50):
        songs.append(playlist['items'][track]['track']['album']['name'])
    song_id = []
    for track in range(50):
        song_id.append(playlist['items'][track]['track']['id'])
    audio_fets = spotify.audio_features(song_id)
    recartist = []
    rec = spotify.artist_related_artists(artist)
    for artist in range(10):
        recartist.append(rec['artists'][artist]['name'])
    top_song_analysis = spotify.audio_analysis(song_id[0])
    loud_seg = []
    for loudness in top_song_analysis['segments']:
        loud_seg.append(loudness)
    
    # return everything
    return()

if __name__ == "__main__":
    app.debug = True
    app.run()
