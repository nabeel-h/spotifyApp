
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

async function getAccessToken() {
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

    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};

async function searchArtist(artist, access_token) {
    let artist_split = artist.split();
    let artist_query = artist_split.join("%20")
    console.log(artist_query)

    const Url = "https://api.spotify.com/v1/search?"+"q="+artist_query+"&type=artist";
    console.log(Url);
    const otherParam = {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+access_token
        }
    };
    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};

async function getArtistAlbums(artistID, access_token) {
    const Url = "https://api.spotify.com/v1/artists/"+artistID+"/albums";
    console.log(Url);
    const otherParam = {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+access_token
        }
    };
    const response = await fetch(Url, otherParam)
    const json = await response.json()
    return json;
};


async function getArtistTopTracks(artistID, access_token) {
    const Url = "https://api.spotify.com/v1/artists/"+artistID+"/top-tracks?country=US";
    console.log(Url);
    const otherParam = {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+access_token
        }
    };
    const response = await fetch(Url, otherParam);
    const json = await response.json();
    return json;
};


function handleTopTracks(tracks){
    // grab 5 tracks, no more than 2 from one album
    let trackList = [];
    let albumCounter = {};
    let uniqueTracks = [];

    tracks.tracks.forEach(function(track) {
        let albumName = track.album.id;
        let trackName = track.name;
        let trackID = track.id;
        let trackReleaseDate = track.release_date;
        
        if (albumCounter.hasOwnProperty(albumName) === false) {
            albumCounter[String(albumName)] = 0;
        };
        albumCounter[String(albumName)] = albumCounter[String(albumName)] + 1;
        
        // if more than 2 songs from same album, then don't add
        if (albumCounter[String(albumName)] > 2) {
            return;
        };

        if (trackList.length === 5) {
            return;

        };
        uniqueTracks.push(trackID);
        trackList.push({
            "trackName": trackName,
            "trackID": trackID,
            "trackReleaseDate": trackReleaseDate,
            "albumID": albumName
        });
    });

    // if less than 5 tracks, then go through tracks again and add tracks not already present
    if (trackList.length < 5) {
        tracks.tracks.forEach(function(track) {
            let albumName = track.album.id;
            let trackName = track.name;
            let trackID = track.id;
            let trackReleaseDate = track.release_date;

            if (uniqueTracks.indexOf(songID) > 0) {
                return;
            };
            trackList.push({
                "trackName": trackName,
                "trackID": trackID,
                "trackReleaseDate": trackReleaseDate,
                "albumID": albumName
            });

        });

        return trackList;

    } else {
    return trackList;
    };
};

export {createFormBody, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks};
