import React from 'react';

class ArtistSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artist: null
        };
    };
        
    componentWillMount() {
        this.setState({
            artist: this.props.artist
        });
    };
    
    handleArtistChange = (event) => {
        this.setState({artist: event.target.value});
    };

    _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.updateArtistCallback(this.state.artist);
        };
    };

    handleArtistSubmit = (event) => {
        console.log("submit button was clicked for: "+this.state.artist);
        this.props.updateArtistCallback(this.state.artist);
        //alert(this.state.artist);
    };

    updateArtistCallback = () =>{
        this.props.updateArtistCallback(this.state.artist);
    };

    printStateCallback = () =>{
        this.props.printStateCallback()
    }
    
    
    render()  
        {
        return (
            <div id="search_container">
            <label>Artist Name:
            <input type="text" id="artistInput" value={this.state.artist} onChange={this.handleArtistChange} onKeyDown={this._handleKeyDown}/>
            </label>
            <input type="submit" value="submit" onClick={this.handleArtistSubmit}/>
            <input type="submit" value="consolePrintState" onClick={this.printStateCallback}/>
            <style jsx>{`
                text-align: center;
            `}</style>
            </div>
            );
        };
    };

export default ArtistSearch;