import React from 'react';

import { Chessboard } from '.';
import { jsonedGameToJSX } from '../functions/jsonedGameToJSX';

import '../index.css';

const jsonedGame = [
  {
    depth: 1,
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    comment:
      'Facusem deja 3 remize consecutive si castigasem o partida(+1) in prima runda',
    shapes: [],
  },
  {
    move: 'd4',
    depth: 1,
    fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    comment: 'Badev e un jucator de initiativa, de atac. De obicei joaca e4.',
    shapes: [],
  },
  {
    move: 'Nf6',
    depth: 1,
    fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2',
    shapes: [],
  },
  {
    move: 'Bg5',
    depth: 1,
    fen: 'rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2',
    comment:
      'Trompowsky - o arma mai rar intalnita in zilele noastre la marii maestrii',
    shapes: [],
  },
  {
    move: 'e6',
    depth: 1,
    fen: 'rnbqkb1r/pppp1ppp/4pn2/6B1/3P4/8/PPP1PPPP/RN1QKBNR w KQkq - 0 3',
    comment:
      'dupa parerea mea cea mai buna mutare si cu siguranta cea care lupta pentru tot punctul.',
    shapes: [],
  },
  {
    depth: 2,
    fen: 'rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2',
    comment: 'o alternativa interesanta este recomandarea lui Andrew Martin:',
    shapes: [],
  },
  {
    move: 'd5',
    depth: 2,
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR w KQkq d6 0 3',
    comment:
      'precum in partida Baratosi-Georgescu.dar albul la un joc corect pastreaza += solid',
    shapes: [],
  },
  {
    move: 'Bxf6',
    depth: 2,
    fen: 'rnbqkb1r/ppp1pppp/5B2/3p4/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 0 3',
    shapes: [],
  },
  {
    move: 'exf6',
    depth: 2,
    fen: 'rnbqkb1r/ppp2ppp/5p2/3p4/3P4/8/PPP1PPPP/RN1QKBNR w KQkq - 0 4',
    shapes: [],
  },
  {
    move: 'e3',
    depth: 2,
    fen: 'rnbqkb1r/ppp2ppp/5p2/3p4/3P4/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 4',
    shapes: [],
  },
  {
    move: 'c6',
    depth: 2,
    fen: 'rnbqkb1r/pp3ppp/2p2p2/3p4/3P4/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 5',
    shapes: [],
  },
  {
    move: 'Bd3',
    depth: 2,
    fen: 'rnbqkb1r/pp3ppp/2p2p2/3p4/3P4/3BP3/PPP2PPP/RN1QK1NR b KQkq - 1 5',
    shapes: [],
  },
  {
    move: 'g6',
    depth: 2,
    fen: 'rnbqkb1r/pp3p1p/2p2pp1/3p4/3P4/3BP3/PPP2PPP/RN1QK1NR w KQkq - 0 6',
    comment: 'Baratosi,D-Georgescu,T 0-1  /CN Echipe juniori B20 2007',
    shapes: [],
  },
  {
    move: 'e4',
    depth: 1,
    fen: 'rnbqkb1r/pppp1ppp/4pn2/6B1/3PP3/8/PPP2PPP/RN1QKBNR b KQkq e3 0 3',
    shapes: [],
  },
  {
    move: 'h6',
    depth: 1,
    fen: 'rnbqkb1r/pppp1pp1/4pn1p/6B1/3PP3/8/PPP2PPP/RN1QKBNR w KQkq - 0 4',
    comment: '',
    shapes: [
      {
        brush: 'red',
        orig: 'e4',
        dest: '',
      },
    ],
  },
  {
    move: 'Bxf6',
    depth: 1,
    fen: 'rnbqkb1r/pppp1pp1/4pB1p/8/3PP3/8/PPP2PPP/RN1QKBNR b KQkq - 0 4',
    shapes: [],
  },
  {
    move: 'Qxf6',
    depth: 1,
    fen: 'rnb1kb1r/pppp1pp1/4pq1p/8/3PP3/8/PPP2PPP/RN1QKBNR w KQkq - 0 5',
    comment: ' negrul ramane cu perechea de nebuni',
    shapes: [
      {
        brush: 'green',
        orig: 'c8',
        dest: '',
      },
      {
        brush: 'green',
        orig: 'f8',
        dest: '',
      },
    ],
  },
];

const Viewer = () => {
  const JSXedGame = jsonedGameToJSX(jsonedGame);

  console.log(JSXedGame);

  return (
    <div className="grid lg:grid-cols-2 gap-4 mb-4" tabIndex={0}>
      <div className="flex">
        <Chessboard jsonedGame={jsonedGame} viewOnly coordinates />
      </div>
      <div>{JSXedGame}</div>
    </div>
  );
};

export default Viewer;
