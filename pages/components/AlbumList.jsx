import React from 'react';



class AlbumList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {albums: this.props.data.albums}
    };
    render() {
        return (
            <div>
                <div class="albumResults">
                    {this.state.albums.map((album, i) => <Album key={i}
                    data={album} />)}
                </div>
                <style jsx>{`
                     {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    }
                `}</style>
            </div>
            
        );
    }
}

class AlbumHeader extends React.Component {
    render() {
        return (
        <div>
            <h1>{this.props.artist}</h1>
        <style jsx>{`
            {
                text-align: center;
            }
        `}</style>
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
                <style>{`
                    .albumDiv {
                    margin: 1rem;
                    border: 1px solid gray;
                    word-wrap: break-word;
                    text-align: center;
                    max-width: 300px;
                    }
                    p {
                        text-align: center;
                        word-wrap: break-word;
                    }

                    .albumDiv:hover .tooltip {
                        display: block;
                    }

                    .tooltip {
                        display: none;
                        background: #C8C8C8;
                        padding: 10px;
                        position: absolute;
                        z-index: 1000;
                        width:100px;
                        height:100px;
                        border-radius: 20px;
                    }

                `}</style>
            </div>
        );
    }
}

export default AlbumList;