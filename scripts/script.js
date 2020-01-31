console.log("Spotify Playlist script loaded.");

let CLIENT_ID = "5a9ee656e60549c5999eb591375e3af9";
let CLIENT_SECRET = "50c5be6ce3684f578b1693b8007d6c0e";




// Used to supply proper body format for x-www-form-urlencoded in body POST request to /token endpoint
function createFormBody(Data) {
    var formBody = [];
    for (var property in Data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(Data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    };
    return formBody
};

window.getArtistsAlbums = function getArtisitsAlbums(artist) {
    let albumResults = null;
        const Url = "https://accounts.spotify.com/api/token";
        const Data = {grant_type: "client_credentials"};

        const otherParam = {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(CLIENT_ID +":" + CLIENT_SECRET)}`,
                "Content-Type": 'application/x-www-form-urlencoded',
            },
            body: createFormBody(Data)
        };

        fetch(Url, otherParam)
        .then(data=>{
            console.log(data);
            return data.json()})
        .then(
            res=>{
            //console.log(res)
            var SpotifyWebApi = require('spotify-web-api-js');
            var spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(res.access_token);
            
            // get artistID for queried artist
            let artistID = null;
            spotifyApi.searchArtists(artist)
            .then(function(data) {
                console.log("Searched artist info...");
                //console.log(data);
                artistID = data.artists.items[0].id;
                console.log(`Artist ID for ${artist} is ${artistID}`);

                // return artists albums
                spotifyApi.getArtistAlbums(artistID)
                .then(function(data) {
                //console.log('Artist albums', data.items);
                albumResults = data.items;
                }, function(err) {
                console.error(err);
                });
            
            }, function(err) {
                console.error(err);
            });
        })
        .catch(error=>console.log(error))

    return albumResults;
    };

console.log(window.getArtistsAlbums("Kendrick Lamar"));

/*

fetch(Url, otherParam)
.then(data=>{
    console.log(data);
    return data.json()})
.then(
    res=>{console.log(res)
    var SpotifyWebApi = require('spotify-web-api-js');
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(res.access_token);

    // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
        if (err) console.error(err);
        else console.log('Artist albums', data);
    });
})
.catch(error=>console.log(error))


*/
