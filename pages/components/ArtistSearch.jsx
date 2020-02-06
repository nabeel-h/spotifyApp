import React from 'react';

class ArtistSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artist: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateArtistCallback = this.updateArtistCallback.bind(this);
    }

    handleChange(event) {
        this.setState({artist: event.target.value})
    }

    handleSubmit(event) {
        console.log("submit button was clicked for: "+this.state.artist);
        this.updateArtistCallback();
        //alert(this.state.artist);
    }

    updateArtistCallback() {
        this.props.artistSearchCallback(this.state.artist);
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Artist Name:
                <input type="text" id="artistInput" value={this.state.artist} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="submit" />
                <style jsx>{`
                    text-align: center;
                `}</style>
            </form>
        )
    }
}



export default ArtistSearch;