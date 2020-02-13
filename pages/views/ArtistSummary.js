import React from 'react';
import AlbumList from '../components/AlbumList.jsx';
import TrackList from '../components/TrackList.jsx';
import {getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from '../api/spotify/spotify/spotify.js';
import Main from '../layouts/Main.js'



class ArtistSummary extends React.Component {
    constructor(){
        super();
        this.state = {
                    albums: null,
                    artist: null,
                    topTracks: null
            }
    };
  
    componentDidMount(){
        this.initData();
    };

    initData = () => {
        let initArtist = "Tupac";
        this.setState({
            artist: initArtist,
            albums: this.generateArtistAlbums(this.updateAlbumsCallback, initArtist),
            //topTracks: [{trackName: "All Eyez on Me"}, {trackName: "Changes"}, {trackName: "Aint nuthin but a gansta party"}]
            topTracks: this.generateArtistTopTracks(this.updateArtistTopTracksCallback, initArtist)
        });
        }
    
    _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.generateArtistAlbums(this.updateAlbumsCallback, this.state.artist);
            this.generateArtistTopTracks(this.updateArtistTopTracksCallback, this.state.artist);

        };
    };

    handleArtistChange = (event) => {
        this.setState({artist: event.target.value})
    };

    handleArtistSubmit = (event) => {
        this.generateArtistAlbums(this.updateAlbumsCallback, this.state.artist);
        this.generateArtistTopTracks(this.updateArtistTopTracksCallback, this.state.artist);
    }

    updateArtistTopTracksCallback = (tracks) => {
        let trackResults = handleTopTracks(tracks);
        this.setState({topTracks: trackResults});
    };

    updateAlbumsCallback = (albums) => {
        //this.setState({albums: albumResults})
        let albumResults = [];
        //console.log("API CALL ALBUMS", albums);
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
        //console.log("CLEANED ARRAY ALBUMS for ARIST: " + this.state.artist, albumResults);
        //console.log("ALB RESULTS - CALLBACK", albumResults);
        this.setState({
            albums: albumResults
            })
        }
    };

    printState = () => {
        console.log(this.state);
    }

    generateArtistTopTracks = (updateArtistTopTracksCallback, artistInput) => {
        getAccessToken().then(function(token) {
            let accessToken = token["access_token"];
            searchArtist(artistInput, accessToken).then(function(response) {
                let artistID = response.artists.items[0]["id"];
                getArtistTopTracks(artistID, accessToken).then(function(tracks) {
                    updateArtistTopTracksCallback(tracks);
                })                
            })
        })
    };

    generateArtistAlbums = (updateAlbumsCallback, artistInput) => {
        getAccessToken().then(function(token) {
            let accessToken = token["access_token"];
              searchArtist(artistInput, accessToken).then(function(response) {
                //console.log("API CALL RESPONSE:", response);
                let artistID = response.artists.items[0]["id"];
                getArtistAlbums(artistID, accessToken).then(function(albums) {
                    updateAlbumsCallback(albums);
                })
              });
        });
    };

    render() {
        //console.log("Data pre render",this.state);
        return (
        <div>
            <Main />
            <div id="header_container">
            <label>Artist Name:
            <input type="text" id="artistInput" value={this.state.artist} onChange={this.handleArtistChange} onKeyDown={this._handleKeyDown}/>
            </label>
            <input type="submit" value="submit" onClick={this.handleArtistSubmit}/>
            <input type="submit" value="consolePrintState" onClick={this.printState}/>
            <style jsx>{`
                text-align: center;
            `}</style>
            </div>
            <div id="artist_container">
            <TrackList data={this.state.topTracks}/>
            <AlbumList data={this.state.albums}/>
            <style>{`
                #artist_container {
                    display: flex;
                    flex-direction: row;
                    background-color: black;
                    flex-wrap: no-wrap;
                    alighn-items: center;
                }
                
            `}
            </style>
            </div>
        </div>
        );
    }
};

export default ArtistSummary;