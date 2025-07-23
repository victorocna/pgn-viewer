import { local } from 'store2';
import { useState } from 'react';
import useRerender from './use-rerender';

const useLocalPgn = () => {
  // Load the default PGN if not already set in local storage
  const defaultPgn = `1. e4 e5 (1... e6) 2. Qh5 Ke7 3. Qxe5 1-0`;
  const localPgn = local.get('pgn') || defaultPgn;

  // State to manage the PGN and a rerender function
  const [pgn, setPgn] = useState(localPgn);
  const [key, rerender] = useRerender();

  return {
    pgn,
    setPgn,
    key,
    rerender,
  };
};

export default useLocalPgn;
