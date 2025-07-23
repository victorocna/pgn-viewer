import { Layout } from '../components';
import { PgnViewer } from 'pgn-viewer';
import { useLocalPgn } from '../hooks';

const Page = () => {
  const { pgn, key } = useLocalPgn();

  return (
    <Layout title="Basic example">
      {/* <div className="rounded-md bg-white border border-gray-400 p-4 min-h-64"> */}
      <PgnViewer key={key} pgn={pgn} header="PGN Viewer" />
      {/* </div> */}
    </Layout>
  );
};

export default Page;
