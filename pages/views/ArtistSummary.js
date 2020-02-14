import React from 'react';
import ArtistAlbumList from '../components/ArtistAlbumList.jsx';
import ArtistTrackList from '../components/ArtistTrackList.jsx';
import ArtistSearch from '../components/ArtistSearch.jsx';
import {getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from '../api/spotify/spotify.js';

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
        if (!this.props.artist) {
            return;
        } else {
        this.initData();
        };
    };

    componentDidUpdate(){

    }

    initData = () => {
        console.log(this.props);
        let initArtist = this.props.artist;
        this.setState({
            artist: initArtist,
            albums: this.generateArtistAlbums(this.updateAlbumsCallback, initArtist),
            //topTracks: [{trackName: "All Eyez on Me"}, {trackName: "Changes"}, {trackName: "Aint nuthin but a gansta party"}]
            topTracks: this.generateArtistTopTracks(this.updateArtistTopTracksCallback, initArtist)
        });
        }
    /*
    _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.generateArtistAlbums(this.updateAlbumsCallback, this.state.artist);
            this.generateArtistTopTracks(this.updateArtistTopTracksCallback, this.state.artist);

        };
    };
    */

    

    handleArtistSubmit = (artist) => {
        this.generateArtistAlbums(this.updateAlbumsCallback, this.state.artist);
        this.generateArtistTopTracks(this.updateArtistTopTracksCallback, this.state.artist);
    }

    // update ArtistSummary state's artist value and artist info
    updateArtistCallback = (artist) => {
        this.setState({artist: artist})
        this.generateArtistAlbums(this.updateAlbumsCallback, artist);
        this.generateArtistTopTracks(this.updateArtistTopTracksCallback, artist);
        
    };

    // update ArtistSummary state for toptracks
    updateArtistTopTracksCallback = (tracks) => {
        let trackResults = handleTopTracks(tracks);
        this.setState({topTracks: trackResults});
    };

    // updates albums state
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

        // when url is refreshed, it returns props with undefined artist so this just renders
        // the searchartist bar for now.
        if (!this.state.artist) {
            return(
            <div>
                <ArtistSearch artist={this.state.artist}
                updateArtistCallback={this.updateArtistCallback}
                printStateCallback={this.printState}/>
            </div>
        );
        } else {
        return (
        <div>
            <ArtistSearch artist={this.state.artist}
                          updateArtistCallback={this.updateArtistCallback}
                          printStateCallback={this.printState}/>
            <div id="artist_container">
            <ArtistTrackList data={this.state.topTracks}/>
            <ArtistAlbumList data={this.state.albums}/>
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
        };
    };
};

export default ArtistSummary;