import React from 'react';
import Layout from './layouts/Layout.js';
import coachella2020 from './assets/data.js';

import {loadspotifyAccessToken, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from './api/spotify/spotify.js';


export default function Index() {

  return (
    <Layout>
      <p>Hi this is my playlist creator.</p>
      <Playlist playlist={coachella2020}/>
    </Layout>
  );
}


class Playlist extends React.Component{
  constructor(){
    super();
    this.state = {
      playlist: null
    };
  };

  componentWillMount() {
    this.setState({
      playlist: this.props.playlist
    })
    loadspotifyAccessToken();
  };

  generateAllArtistTracks = () => {
    console.log("Generate all artist tracks...");

    Object.keys(this.refs).forEach( (child) => {
        console.log(child);
        if(child !== 'self') {
        console.log(child);
        this.refs[child].handlegetTracksSubmit();
         };
      });
    }

  deleteArtistCallback = (artist) => {
    /*
    console.log("Deleting artist...", artist);
    let newPlaylist = this.state.playlist.artists;
    
    var removeIndex = newPlaylist.map(function(artist) {return artist;}).indexOf(artist);
    newPlaylist.splice(removeIndex, 1);

    this.setState({
        playlist: {
            artists: newPlaylist
        }
    })*/
  };

  render() {
    let artists = this.state.playlist.artists;
    let playlistName = this.state.playlist.playlistName;
    console.log("Rendering artist", artists);
    var getRef = function(){ return 'Child-'+(refi++); },    refi=0;
    return (
      <div>
      <p>PlaylistName: {playlistName}</p>
      <button onClick={this.generateAllArtistTracks}>Generate Tracks for Artists</button>
      {artists.map((artist, i) => <ArtistCard key={i}
                    artist={artist} deleteArtistCallback={this.deleteArtistCallback} ref={getRef()}/>)}
      </div>
    );
  };
};

class ArtistCard extends React.Component {
  constructor(props){
    super();
    this.state = {
      artist: props.artist,
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
    this.deleteArtistCallback(artist);
    
    /*
    let tracks = this.state.tracks;
    tracks.forEach(track => {
      this.deleteTrackCallback(track);
    });
    */

    this.setState({
      artist: null,
      tracks: null
    })
};

  deleteArtistCallback = (artist) => {
    this.props.deleteArtistCallback(artist);
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
    if (!tracks || tracks.length == 0) {
      return(
          <div>
          <a>{artist}    </a>
          <button onClick={this.handlegetTracksSubmit}>Get Tracks</button>
          <button onClick={this.handleDeleteArtist}>Delete Artist</button>
          </div>
      );
    } else {
    return (
        <div>
            <a>{artist}    </a>
            <button onClick={this.handlegetTracksSubmit}>Get Tracks</button>
            <button onClick={this.handleDeleteArtist}>Delete Artist</button>
            <p>{tracks.map((track, i) => <Track track={track.trackName} artist={artist} deleteTrack={this.deleteTrackCallback}/>)}</p>
        </div>
        );
    };
  };
};



class Track extends React.Component{
  constructor(props){
    super();
    this.state = {
      track: props.track,
      artist: props.artist
    };
  };

 

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
      <p>{this.props.track}</p><button onClick={this.deleteTrackCallback}>
          Delete
      </button>
      </div>
    );
  };

};