import React from 'react';
import Layout from './layouts/Layout.js';
import coachella2020 from './assets/data.js';

import {getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks} from './api/spotify/spotify.js';


export default function Index() {
  return (
    <Layout>
      <p>Hi this is my playlist creator.</p>
      <button onClick={() => alert("harro")}>Generate Tracks for Artists</button>
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
  };

  render() {
    let artists = this.state.playlist.artists;
    let playlistName = this.state.playlist.playlistName;
    return (
      <div>
      <p>PlaylistName: {playlistName}</p>
      {artists.map((artist, i) => <ArtistCard key={i}
                    artist={artist} />)}
      </div>
    );
  };
}


class ArtistCard extends React.Component {
  constructor(){
    super();
    this.state = {
      artist: null,
      tracks: null
    };
  };

  componentWillMount() {
    this.setState({
      artist: this.props.artist
    })
  };

  handleArtistTrackSubmit = () => {
    this.generateTracksForArtists(this.updateArtistTrackCallback, this.state.artist)
  };

  updateArtistTrackCallback = (tracks) => {
    let topTracks = handleTopTracks(tracks);
    this.setState({tracks: topTracks});
  };

  generateTracksForArtists = (updateArtistTrackCallback, artistInput) => {
    getAccessToken().then(function(token) {
      let accessToken = token["access_token"];
      searchArtist(artistInput, accessToken).then(function(response) {
          let artistID = response.artists.items[0]["id"];
          getArtistTopTracks(artistID, accessToken).then(function(tracks) {
            updateArtistTrackCallback(tracks);
          })                
      })
    })
  };

  render() {

    let tracks = this.state.tracks;
    console.log("tracks",tracks)
    if (!tracks) {
      return(
          <div>
          <a>{this.props.artist}    </a><button onClick={this.handleArtistTrackSubmit}>Get Tracks</button>
          </div>
      );
    } else {
    return (
      <div>
      <a>{this.props.artist}    </a><button>Get Tracks</button>
      <p>{tracks.map((track, i) => <Track track={track.trackName}/>)}</p>
      </div>
      )
    }
  };
};



class Track extends React.Component{
  render() {
    return(
      <p>{this.props.track}</p>
    );
  };

};