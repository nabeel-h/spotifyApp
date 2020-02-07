import React from 'react';
import AlbumList from '../components/AlbumList.jsx';
import ArtistSearch from '../components/ArtistSearch.jsx'
import Main from '../layouts/Main.js'

class Albums extends React.Component {
    constructor(){
        super();
        this.state = {
                    albums: null,
                    artist: null
            }
    }
  
    componentDidMount(){
        this.initData();
    };

    initData = () => {
        let initArtist = "Eminem";

        this.setState({
            artist: initArtist,
            albums: []
        });
        }
    
    _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.generateArtistAlbums(this.updateAlbumsCallback);
        };
    };

    handleArtistChange = (event) => {
        this.setState({artist: event.target.value})
    };

    handleArtistSubmit = (event) => {
        this.generateArtistAlbums(this.updateAlbumsCallback);
    }

    updateAlbumsCallback = (albumResults) => {
        //this.setState({albums: albumResults})
        console.log("ALB RESULTS - CALLBACK", albumResults);
        this.setState({
            albums: albumResults
        })
    }

    printState = () => {
        console.log(this.state);
    }

    generateArtistAlbums = (callback) => {
        let albumResults = [];
        let artistInput = this.state.artist;
        getAccessToken().then(function(token) {
            let accessToken = token["access_token"];
              searchArtist(artistInput, accessToken).then(function(response) {
                console.log("API CALL RESPONSE:", response);
                let artistID = response.artists.items[0]["id"];
                getArtistAlbums(artistID, accessToken).then(function(albums) {
                    
                    console.log("API CALL ALBUMS", albums);
                    // keeps track of unique album names
                    // if already in there, then dont list
                    let albumUniques = [];
                    for (let j=0;j <albums.items.length;j++) {
                        let albumPic300 = albums.items[j].images[1]
                        let albumName = albums.items[j]["name"];
                        let releaseDate = albums.items[j]["release_date"];
                        let numTracks = albums.items[j]["total_tracks"];
                        if (albumUniques.indexOf(albumName) > 0) {
                            continue;
                            };
                        albumUniques.push(albumName);
                        albumResults.push({
                            "albumName": albumName,
                            "albumPic300": albumPic300,
                            "releaseDate": releaseDate,
                            "numTracks": numTracks
                        });
                    };
                    console.log("CLEANED ARRAY ALBUMS for ARIST: "+artistInput, albumResults);
                    callback(albumResults);
                })
              });
        });
    };

    render() {
        console.log("Data pre render",this.state);
        return (
        <div>
            <Main />
            <label>Artist Name:
            <input type="text" id="artistInput" value={this.state.artist} onChange={this.handleArtistChange} onKeyDown={this._handleKeyDown}/>
            </label>
            <input type="submit" value="submit" onClick={this.handleArtistSubmit}/>
            <input type="submit" value="consolePrintState" onClick={this.printState}/>
            <style jsx>{`
                text-align: center;
            `}</style>
            <AlbumList data={this.state.albums}/>
            
        </div>
        );
    }
};



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

async function processAlbumsResponse(albums) {
    console.log("API CALL ALBUMS", albums);
    // keeps track of unique album names
    // if already in there, then dont list
    let albumUniques = [];
    for (let j=0;j <albums.items.length;j++) {
        let albumPic300 = albums.items[j].images[1]
        let albumName = albums.items[j]["name"];
        let releaseDate = albums.items[j]["release_date"];
        let numTracks = albums.items[j]["total_tracks"];
        if (albumUniques.indexOf(albumName) > 0) {
            continue;
            };
        albumUniques.push(albumName);
        albumResults.push({
            "albumName": albumName,
            "albumPic300": albumPic300,
            "releaseDate": releaseDate,
            "numTracks": numTracks
        });
    };
}

function handleTopTracks(tracks){
    // grab 5 tracks, no more than 2 from one album
    let trackList = [];
    let albumCounter = {};
    let uniqueTracks = [];

    tracks.tracks.forEach(function(track) {
        let albumName = track.album.id;
        let songName = track.name;
        let songID = track.id;
        let songReleaseDate = track.release_date;
        
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
        uniqueTracks.push(songID);
        trackList.push({
            "songName": songName,
            "songID": songID,
            "songReleaseDate": songReleaseDate,
            "albumID": albumName
        });
    });

    // if less than 5 tracks, then go through tracks again and add tracks not already present
    if (trackList.length < 5) {
        tracks.tracks.forEach(function(track) {
            let albumName = track.album.id;
            let songName = track.name;
            let songID = track.id;
            let songReleaseDate = track.release_date;

            if (uniqueTracks.indexOf(songID) > 0) {
                return;
            };
            trackList.push({
                "songName": songName,
                "songID": songID,
                "songReleaseDate": songReleaseDate,
                "albumID": albumName
            });

        });

        return trackList;

    } else {
    return trackList;
    };
};

export default Albums;