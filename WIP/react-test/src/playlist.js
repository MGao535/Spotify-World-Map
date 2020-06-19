var request = require("request");
var user_id = "chingstah117";
var token = "Bearer BQCb8oQg8amfHI-KJ7fgw6C4x-FA0G3RbFcEZ1Ncr1_ZHdi6SZxGuG8Xwz0lclkulIJwgWJV7EuIFZHmmkL2_AtUqJqPnm_W7PaRQn5FACgk59gawHu5yXxlB3nFWNmsBMT-uS5LwaGDv2PmJxixYn_sJU4u7IGy2Hx0";
var playlist = `https://api.spotify.com/v1/users/${user_id}/playlists`;

var link = "xx"

request({url:playlist, headers:{"Authorization":token}}, function(err, res){
    if(res){
        var playlists = JSON.parse(res.body);
        //console.log(playlists);
        link = playlists.items[0].tracks;


    };


});

console.log(link);

request({url:link, headers:{"Authorization":token}}, function(err, res){
	if(res){
	    var tracks = JSON.parse(res.body);
	console.log(tracks);
	}
});