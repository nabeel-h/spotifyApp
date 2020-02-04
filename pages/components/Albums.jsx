import React from 'react';

class AlbumList extends React.Component {
    constructor() {
        super();
        this.state = {
            albums:
            [
                {
                    "albumPic300": 'https://i.scdn.co/image/01273298d6d7ec9091637a833b6188f990ddb6a2',
                    "albumName": "Kamikaze",
                    "releaseDate": "01-01-2019",
                    "numTracks": 10,
                },
                {
                    "albumPic300": 'https://i.scdn.co/image/3f505feb301e37af5d6e23bc6782bbf6cb575183',
                    "albumName": "The Marshalls Mathers LP",
                    "releaseDate": "01-01-2017",
                    "numTracks": 12,
                }
            ],
            artist: "Eminem"
        }
    }
    render() {
        return (
            <div>
                <AlbumHeader artist={this.state.artist}/>
                <div class="albumResults">
                    {this.state.albums.map((album, i) => <Album key={i}
                    data={album} />)}
                </div>
            </div>
        )
    }
}

class AlbumHeader extends React.Component {
    render() {
        return (
        <div>
            <h1>{this.props.artist}</h1>
        </div>
        );    
    }
}

class Album extends React.Component {
    render() {
        return (
            <div class="albumDiv">
                <span class="tooltip">
                    <p>Released: {this.props.data.releaseDate}</p>
                    <p># of Tracks: {this.props.data.numTracks}</p>
                </span>
                <img src={this.props.data.albumPic300} alt={this.props.data.albumName} width="300" height="300"></img>
                <p>{this.props.data.albumName}</p>
            </div>
        );
    }
}

export default AlbumList;