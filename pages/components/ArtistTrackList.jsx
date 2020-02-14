import React from 'react';

class ArtistTrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tracks: props}
    };

    render() {
        let trackList = this.props.data;
        if (!trackList) {
            return(
                <div></div>
            );
        } else {
        return(
                <div className="trackList_container">
                    <p id="topTracks_p">Top Tracks:</p>
                    <div className="trackList">
                    {trackList.map((track, i) => <ArtistTrack index={i}
                    data={track} />)}
                    </div>
                    <style jsx>{`
                            {
                                .trackList_container {
                                    padding: 10px 10px 10px 10px;
                                }
                                .trackList {
                                    text-align: center;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                }
                                #topTracks_p {
                                    color: white;
                                    margin-bottom: 0px;
                                    text-align: center;
                                }
                                
                        }
                    `}</style>
                </div>
                
            );
        }
    };

};

class ArtistTrack extends React.Component {
    render() {
        let trackNumber = this.props.index + 1;
        return(
                <div className="track">
                <span>{trackNumber + ". " + this.props.data.trackName}</span>
                <style>{`
                .track span {
                    text-align: left;
                    background-color: #444;
                    color: #fff;
                    border-radius: 5px;
                    padding: 2px;
                    font-size: 100%;
                    min-width: 300px;
                    max-width: 600px;
                    display: inline-block;
                    }
                .track:nth-child(odd) > span {
                    background-color: #ccc;
                    color: #000;
                }
                    `}
                </style>
                </div>
            );
    };
};


export default ArtistTrackList;