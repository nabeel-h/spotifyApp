
let CLIENT_ID = "5a9ee656e60549c5999eb591375e3af9";
let CLIENT_SECRET = "50c5be6ce3684f578b1693b8007d6c0e";


const EXPIRATION_TIME = 3600 * 1000;
export const setLocalAccessToken = response => {
    setExpirationTimestamp(response["expires_in"]);
    localStorage.setItem('spotify_access_token', response["access_token"]);
};

const setLocalRefreshToken = token => {
    localStorage.setItem('spotify_access_token', token);
};

const setExpirationTimestamp = EXPIRATION_TIME => {
    EXPIRATION_TIME *= 1000;
	const dateObj = new Date(Date.now() + EXPIRATION_TIME).getTime(); // add 1 hour to current time
	window.localStorage.setItem('spotify_expiration_timestamp', dateObj);
};

export const getLocalAccessToken = () => {
    console.log("Getting stored access token...");
    runExpirationChecker();
    return window.localStorage.getItem('spotify_access_token');
    
};

export const getLocalRefreshToken = () => {
	window.localStorage.getItem('spotify_refresh_token');
};

 export const getExpirationTimestamp = () =>
	window.localStorage.getItem('spotify_expiration_timestamp');

export const loadspotifyAccessToken = async () => {
    console.log("Getting and storing Spotify Access Token...");
    const response = await getAccessToken();
    setLocalAccessToken(response);
};

const logout = () => {
	window.localStorage.removeItem('spotify_access_token');
	window.localStorage.removeItem('spotify_refresh_token');
	window.localStorage.removeItem('spotify_expiration_timestamp');
	window.location.reload();
};

let expirationChecker;

const refreshAccessToken = async () => {
	try {
		// Get new access token
		const { access_token } = getAccessToken();;
		setLocalAccessToken(access_token);
	} catch (e) {
		// Refresh token is invalid
		logout();
	}
};

const runExpirationChecker = () => {
	// Clear existing checker
	if (expirationChecker) clearTimeout(expirationChecker);
	// Get expiration in milliseconds
	const expiresInMillis = getExpirationTimestamp() - new Date().getTime();
	console.log(`Token expires in ${expiresInMillis}`);
	expirationChecker = setTimeout(async () => {
		await refreshAccessToken();
		runExpirationChecker();
	}, expiresInMillis);
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

async function searchArtist(artist) {
    let access_token = getLocalAccessToken();
    console.log(window.localStorage);
    console.log("Search artist - access token", access_token, artist);
    let artist_split = artist.split();
    let artist_query = artist_split.join("%20")
    console.log("Searching for artists...",artist_query)

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
    console.log("Artist API search response...", json);
    return json;
};

async function getArtistAlbums(artistID) {
    let access_token = getLocalAccessToken()
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
    console.log(json);
    return json;
};


async function getArtistTopTracks(artistID) {

    let access_token = getLocalAccessToken()
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


function handleTopTracks(tracks, artist){
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
            "albumID": albumName,
            "artistName": artist
        });
    });

    // if less than 5 tracks, then go through tracks again and add tracks not already present
    if (trackList.length < 5) {
        tracks.tracks.forEach(function(track) {
            let albumName = track.album.id;
            let trackName = track.name;
            let trackID = track.id;
            let trackReleaseDate = track.release_date;

            if (uniqueTracks.indexOf(trackID) > 0) {
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

export {createFormBody, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks};
