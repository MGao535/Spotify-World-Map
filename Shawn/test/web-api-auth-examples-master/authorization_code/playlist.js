var request = require("request");
var user_id = "sguthrie123";
var id = '6In6SkveIw26thdYRhHTVX'
var token = "Bearer BQBE7q4YbMZCTEHPuRIhSco9rqAlTrCuNIXzh-5TcskZSmlgqL2MJduvK962hIAY3LeQnFsjSOhy7X1O60lewAV3QJZLBh_YHJUB--uQtaEkCrdZlJ6Re7KhEtOLdtIfa8k41fZr_pRu7wKDQmHrBx0gBWDTCix3t18";
var playlist = `https://api.spotify.com/v1/audio-features/${id}`;

request({url:playlist, headers:{"Authorization":token}}, function(err, res){
    if(res){
        var playlists = JSON.parse(res.body);
        console.log(playlists);
    }
});