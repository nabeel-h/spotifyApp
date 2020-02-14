import React from 'react';
import Helmet from 'react-helmet';
import NavBar from '../components/NavBar.jsx';

class Layout extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <Helmet defaultTitle="SpotifyApp">     
                </Helmet>
                <NavBar></NavBar>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;