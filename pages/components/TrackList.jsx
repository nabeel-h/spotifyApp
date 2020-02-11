import React from 'react';

class TrackList extends React.Component {
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
                <div>
                    <p>Top Tracks:</p>
                    <div className="trackList">
                    {trackList.map((track, i) => <Track index={i}
                    data={track} />)}
                    </div>
                    <style jsx>{`
                            {
                                
                        }
                    `}</style>
                </div>
                
            );
        }
    };

};

class Track extends React.Component {
    render() {
        let trackNumber = this.props.index + 1;
        return(
                <div className="track">
                <p>{trackNumber + ". " + this.props.data.trackName}</p>
                <style>{`
                
                
                .track p {
                    text-align: center;
                    background-color: green;
                    color: black;
                    border-radius: 5px;
                    padding: 2px;
                    font-size: 100%;
                    }
                .track > p:nth-child(even) {
                    background-color: grey;
                }
                
                    `}
                </style>
                </div>
            );
    };
};


export default TrackList;