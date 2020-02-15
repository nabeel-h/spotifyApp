import Link from 'next/link';
import Layout from './layouts/Layout.js';
import ArtistSummary from './views/ArtistSummary.js';


const ArtistSummaryPageLink = props => (
    <li>
        <Link href={`/artistsummary_page?artist=${props.artist}`} as={`/artistsummary_page?artist=${props.artist}`}>
            <a>{props.artist}</a>
        </Link>
    </li>
);

class Index extends React.Component {
    render() {
    return (
        <Layout>
            <ul>
                <ArtistSummaryPageLink artist="Eminem" />
                <ArtistSummaryPageLink artist="Kendrick Lamar"/>
                <ArtistSummaryPageLink artist="Queen"/>
            </ul>
            <ArtistSummary />
        </Layout>
        );
    };
};

export default Index;

