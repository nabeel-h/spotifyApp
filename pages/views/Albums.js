import React from 'react';
import AlbumList from '../components/AlbumList.jsx';
import ArtistSearch from '../components/ArtistSearch.jsx'
import Main from '../layouts/Main.js'

class Albums extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                    albums: null,
                    artist: null
            }
    }

    componentWillMount(){
        this.initData();
    };

    initData = (data) => {
        let initAlbums = [
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
                    ];
        let initArtist = "Eminem";

        this.setState({
            albums: initAlbums,
            artist: initArtist
        });
        }
    

    artistSearchCallback = (newArtist) => {
        console.log("Artist returned: "+newArtist);
        this.setState({
            artist: newArtist
        });
    }
    render() {
        return (
        <div>
            <p>{this.state.artist}</p>
            <Main />
            <ArtistSearch artistSearchCallback={this.artistSearchCallback}/>
            <AlbumList data={this.state.albums}/>
        </div>
        );
    }
};


const test_data = {
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


export default Albums;