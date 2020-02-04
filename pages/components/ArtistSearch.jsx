import React from 'react';

class ArtistSearch extends React.Component {
    render() {
        return (
            <div>
                <label>Artist Name:</label>
                <input type="text" id="artistInput"></input>
                <button type="button" id="artistInputBtn">Search Artist</button>
            </div>
        )
    }
}

export default ArtistSearch;