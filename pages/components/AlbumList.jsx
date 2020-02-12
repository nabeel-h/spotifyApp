import React from 'react';



class AlbumList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {albums: props}
    };
    render() {
        let albumData = this.props.data;
        //console.log("Data passed(state) into AlbumList", this.state);
        //console.log("Data passed(props) into AlbumList", this.props.data);
        if (!albumData) {
            return(
                <div>
                <div className="albumResults">
                </div>
                <style jsx>{`
                     {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    }
                `}</style>
            </div>
            )
        } else {

        return(
            <div className="albumList_container">
                <div className="albumResults">
                    {albumData.map((album, i) => <Album key={i}
                    data={album} />)}
                </div>
                <style jsx>{`
                     {
                    display: flex;
                    flex-wrap: wrap;
                    
                    }
                `}</style>
            </div>
            
        );
    };
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
            <div className="albumDiv">
                <span className="tooltip">
                    <p>Released: {this.props.data.releaseDate}</p>
                    <p># of Tracks: {this.props.data.numTracks}</p>
                </span>
                <img src={this.props.data.albumPic300.url} alt={this.props.data.albumName} width="300" height="300"></img>
                <span>{this.props.data.albumName}</span>
                <style>{`
                    .albumDiv {
                    margin: 1rem;
                    border: 1px solid gray;
                    word-wrap: break-word;
                    text-align: center;
                    max-width: 300px;
                    background-color: grey;
                    }
                    p {
                        text-align: center;
                        word-wrap: break-word;
                    }

                    span {
                        text-align: center;
                        word-wrap; break-word;
                        color: white;
                        width: 100%;
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