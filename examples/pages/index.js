import { Layout, PgnFileLoader } from '../components';
import { PgnViewer } from 'next-pgn-viewer';
import { useLocalPgn, useTheme } from '../hooks';

const Page = () => {
  const { pgn, setPgn, key, rerender } = useLocalPgn();
  const { theme } = useTheme();

  return (
    <Layout
      title="Basic example"
      button={<PgnFileLoader rerender={rerender} onPgnLoad={setPgn} />}
    >
      <PgnViewer key={key} pgn={pgn} header="PGN Viewer" theme={theme} />
    </Layout>
  );
};

export default Page;
