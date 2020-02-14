import Link from 'next/link';
import Layout from './layouts/Layout.js';


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
            </ul>
        </Layout>
        );
    };
};

export default Index;

