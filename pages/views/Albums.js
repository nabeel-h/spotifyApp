import React from 'react';
import AlbumList from '../components/AlbumList.jsx';
import ArtistSearch from '../components/ArtistSearch.jsx'
import Main from '../layouts/Main.js'

class Albums extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            albums: {
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
        this.artistSearchCallback = this.artistSearchCallback.bind(this);
    }

    artistSearchCallback = (artistSearchData) => {
        console.log("Received button update: "+artistSearchData);
        this.setState((state, props) => {
            return {albums: state.albums,
                    artist: artistSearchData}
        });
    }
    render() {
        return (
        <div>
            <Main />
            <ArtistSearch />
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