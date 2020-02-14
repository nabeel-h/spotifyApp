import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/Header.jsx';

class Layout extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <Helmet defaultTitle="SpotifyApp">     
                </Helmet>
                <Header></Header>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;