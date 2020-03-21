import React from 'react';
import {loadspotifyAccessToken, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from '../../api/spotify/spotify.js';
import Track from './Track.jsx';

class ArtistCard extends React.Component {
    constructor(props){
      super();
      this.state = {
        tracks: null
      };
    };
  
  
    handlegetTracksSubmit = () => {
      this.generateTracksForArtists(this.updateArtistTracksCallback, this.props.artist)
    };
  
  
    updateArtistTracksCallback = (tracks) => {
      let artist = this.props.artist
      let topTracks = handleTopTracks(tracks, artist);
      this.setState({tracks: topTracks});
    };
  
    handleDeleteArtist = () => {
      let artist = this.props.artist;
      this.deleteArtistsTracks();
      this.deleteArtistCallback(artist);
  };
  

    deleteArtistCallback = (artist) => {
        this.props.deleteArtistCallback(artist);
    };

    
    deleteArtistsTracks = () => {
        this.setState({
            tracks: null
        })
    };

    deleteTrackCallback = (track) =>{
    let tracks = this.state.tracks;
    var removeIndex = tracks.map(function(track) { return track.trackName; }).indexOf(track);
  
    // remove object
    tracks.splice(removeIndex, 1);
    console.log("Deleting.."+track);
    console.log(tracks);
    this.setState({
        tracks: tracks
    });
    };
  
    generateTracksForArtists = (updateArtistTracksCallback, artistInput) => {
      console.log("Generating tracks for...", artistInput);
      getAccessToken().then(function(token) {
        let accessToken = token["access_token"];
        searchArtist(artistInput, accessToken).then(function(response) {
            let artistID = response.artists.items[0]["id"];
            getArtistTopTracks(artistID, accessToken).then(function(tracks) {
              updateArtistTracksCallback(tracks);
            })                
        })
      })
    };
  
    render() {
  
        let tracks = this.state.tracks;
        let artist = this.props.artist;
       
        const renderTracks = (!tracks || tracks.length === 0) ? null 
        : tracks.map((track, i) => <Track track={track.trackName} 
                                  key={track.trackID} 
                                  artist={artist} 
                                  deleteTrack={this.deleteTrackCallback}/>
                    );
      return (
            <div>
                <span className="artistName" style={{color: "red"}}>{artist}    </span>
                <button onClick={this.handlegetTracksSubmit}>Get Tracks</button>
                <button onClick={this.handleDeleteArtist}>Delete Artist</button>
                <span>{renderTracks}</span>                
            </div>
            );
    };
  };

  export default ArtistCard;