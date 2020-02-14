import Layout from './layouts/Layout.js';
import ArtistSummary from './views/ArtistSummary.js';
import { useRouter } from 'next/router';

const ArtistSummaryPage = () => {
    const router = useRouter();

    return (
        <Layout>
            <ArtistSummary artist={router.query.artist}/>
        </Layout>
    );
};

export default ArtistSummaryPage;