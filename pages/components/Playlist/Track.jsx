import React from 'react';
import {loadspotifyAccessToken, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from '../../api/spotify/spotify.js';

class Track extends React.Component{
    
  
   
  
  handleDeleteTrack = () => {
                              this.deleteTrackCallback();
                              };
  
  deleteTrackCallback = () => {
      let track = this.props.track; 
      this.props.deleteTrack(track);
      };
  
  render() {
      return(
        <div>
        <span>{this.props.track}</span>
        <button onClick={this.deleteTrackCallback}>
            Delete
        </button>
        </div>
      );
    };
  
  };


  export default Track;