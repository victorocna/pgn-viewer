import { PgnTree } from 'pgn-viewer';
import { Layout } from '../components';

const Page = () => (
  <Layout title="Basic example">
    <div className="grid md:grid-cols-2 gap-12">
      <PgnTree />
    </div>
  </Layout>
);

export default Page;
