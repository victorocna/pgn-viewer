import { Layout, PgnFileLoader } from '../components';
import { PgnViewer } from 'next-pgn-viewer';
import { useLocalPgn } from '../hooks';

const Page = () => {
  const { pgn, setPgn, key, rerender } = useLocalPgn();

  return (
    <Layout
      title="Basic example"
      button={<PgnFileLoader rerender={rerender} onPgnLoad={setPgn} />}
    >
      <PgnViewer key={key} pgn={pgn} header="PGN Viewer" />
    </Layout>
  );
};

export default Page;
