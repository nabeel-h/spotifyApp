import React from 'react';
import ArtistCard from '../components/Playlist/ArtistCard.jsx'
import {loadspotifyAccessToken, getAccessToken, searchArtist, getArtistAlbums, getArtistTopTracks, handleTopTracks, getLocalAccessToken} from '../api/spotify/spotify.js';



class Playlist extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        playlist: props.playlist,
        playlistName: props.playlist.playlistName
      };
    };
  
    componentWillMount() {
      loadspotifyAccessToken();
    };

    componentDidMount() {
      let artistsArray = this.state.playlist.artists.slice();
      artistsArray.map((artist) => this.getArtistIDs(this.updateArtistIDCallback, artist.artistName))
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
  
    updateArtistIDCallback = (artist, artistID) => {
      var removeIndex = this.state.playlist.artists.map(function(artist) {return artist.artistName;}).indexOf(artist);
      let artistsArray = this.state.playlist.artists.slice();
      artistsArray[removeIndex]["artistID"] = artistID;
      this.setState(prevState => ({
        playlist: {
          artists : artistsArray
                  }
          }), () => {
          console.log(artist + " ID updated to: " + artistID);
      });
    };

    getArtistIDs = (updateArtistIDCallback, artistInput) => {
        searchArtist(artistInput).then(function(response) {
            let artistID = response.artists.items[0]["id"];
            updateArtistIDCallback(artistInput, artistID)}
        )
    };

    deleteArtistCallback = (artist) => {
      console.log("Deleting artist...", artist);
      let newPlaylist = Array.from(this.state.playlist.artists);
      console.log("old artists list", newPlaylist);
      var removeIndex = newPlaylist.map(function(artist) {return artist.artistName;}).indexOf(artist);
      newPlaylist.splice(removeIndex, 1);
      console.log("new artists list", newPlaylist);
      this.setState({
          playlist: {
              artists: newPlaylist,
          }
      })
      
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
        {artists.map((artist, i) => {
                      return (<ArtistCard key={artist.artistID}
                              artist={artist.artistName} 
                              deleteArtistCallback={this.deleteArtistCallback} 
                              ref={getRef()}/>)
                      })}
          </div>
      );
    };
  };
  

  export default Playlist

