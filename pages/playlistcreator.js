import React from 'react';
import Layout from './layouts/Layout.js';
import coachella2020 from './assets/data.js';
import Playlist from './views/Playlist.js';



export default function Index() {
  return (
    <Layout>
      <p>Hi this is my playlist creator.</p>
      <Playlist playlist={coachella2020}/>
    </Layout>
    );
}