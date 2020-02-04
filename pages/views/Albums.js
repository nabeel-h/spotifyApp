import React from 'react';
import ReactDOM from 'react-dom';
import AlbumList from '../components/Albums.jsx';
import ArtistSearch from '../components/ArtistSearch.jsx'
import Main from '../layouts/Main.js'

class Albums extends React.Component {
    render() {
        return (
        <div>
            <Main />
            <ArtistSearch />
            <AlbumList />
        </div>
        );
    }
};

export default Albums;