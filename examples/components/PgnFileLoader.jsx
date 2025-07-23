import { useRef } from 'react';
import { local } from 'store2';
import Button from './Button';

const PgnFileLoader = ({ rerender, onPgnLoad }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.pgn')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pgnText = e.target.result;
        local.set('pgn', pgnText);
        onPgnLoad(pgnText);
        rerender();
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        onClick={handleFileSelect}
        className="bg-accent hover:bg-accent-dark text-white px-4 py-2 -my-1 rounded-md text-sm font-medium transition-colors"
      >
        Load PGN
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pgn"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default PgnFileLoader;
