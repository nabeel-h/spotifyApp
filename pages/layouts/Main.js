import React from 'react';
import Helmet from 'react-helmet';

class Main extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <Helmet defaultTitle="SpotifyApp">
                    <link rel="stylesheet" href="css/style.css"/>       
                </Helmet>
            </div>
        )
    }
}

export default Main;