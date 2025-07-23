import { Layout } from '../components';
import { PgnViewer } from 'pgn-viewer';
import { useLocalPgn } from '../hooks';

const Page = () => {
  const { pgn, key } = useLocalPgn();

  return (
    <Layout title="Basic example">
      <PgnViewer key={key} pgn={pgn} header="PGN Viewer" />
    </Layout>
  );
};

export default Page;
