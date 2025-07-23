import { Layout, PgnViewer } from '../components';
// import { PgnViewer } from 'pgn-viewer';
import { useLocalPgn } from '../hooks';

const Page = () => {
  const { pgn, key } = useLocalPgn();

  return (
    <Layout>
      <main className="w-full p-4 lg:col-span-5 lg:p-8 xl:px-12">
        <div className="mb-4 flex items-center gap-4">
          <h3 className="text-2xl font-semibold text-black">PGN viewer</h3>
        </div>
        <div className="rounded-md bg-white border border-gray-400 p-4 min-h-64">
          <PgnViewer key={key} pgn={pgn} header="PGN Viewer" />
        </div>
      </main>
    </Layout>
  );
};

export default Page;
