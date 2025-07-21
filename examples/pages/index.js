import { PgnViewer } from 'pgn-viewer';
import { Layout } from '../components';
import useLocalPgn from '../hooks/use-local-pgn';

const Page = () => {
  const { pgn, key } = useLocalPgn();

  return (
    <Layout title="Basic example">
      <div className="w-full">
        <PgnViewer key={key} pgn={pgn} />
      </div>
    </Layout>
  );
};

export default Page;
