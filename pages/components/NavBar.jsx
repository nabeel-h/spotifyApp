import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const NavBar = () => (
  <div>
    <Link href="/index">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/artistsummary">
      <a style={linkStyle}>ArtistSummary</a>
    </Link>
    <Link href="/playlistcreator">
      <a style={linkStyle}>PlaylistCreator</a>
    </Link>
  </div>
);

export default NavBar;
