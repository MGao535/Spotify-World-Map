var api_key = "7c34c892933d446fae874d28b3f6a9b2" ;

var url = "https://accounts.spotify.com/authorize";

var test = "https://accounts.spotify.com/authorize?client_id=d76e0263612746c1891673bca5220cd0&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09";

d3.json(test).then(function(data){
    console.log(data);
});