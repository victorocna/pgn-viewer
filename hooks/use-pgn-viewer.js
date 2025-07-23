import {
  tree as chessTree,
  getNextMoments,
  getPrevMoment,
  momentsToPgn,
} from 'chess-moments';
import { flatten, isEmpty, last } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import {
  coffee,
  getMainlineMoments,
  getSideToMove,
  handleUserMoveVariations,
} from '../functions';

const usePgnViewer = (pgn, options) => {
  const {
    autoSelectMainline = false,
    initialMoveIndex = 0,
    isDrillMode = false,
    useArrowsToMove = true,
  } = options || {};

  // === PGN state and navigation
  const [treeState, setTree] = useState(chessTree(pgn));
  const moments = useMemo(() => {
    return isDrillMode ? getMainlineMoments(treeState) : flatten(treeState);
  }, [treeState, isDrillMode]);

  // Memoized PGN state
  const pgnState = useMemo(() => {
    return momentsToPgn(moments);
  }, [moments]);

  const firstMoment = useMemo(() => moments[0], [moments]);
  const lastMoment = useMemo(() => moments[moments.length - 1], [moments]);

  // Determine which side has the first turn
  const firstTurn = useMemo(() => getSideToMove(firstMoment?.fen), [
    firstMoment,
  ]);

  // Fallback to default moment if first moment is not available
  const defaultMoment = { fen: '', shapes: [] };

  const [currentMoment, setCurrentMoment] = useState(
    firstMoment || defaultMoment
  );
  const [variations, setVariations] = useState(null);
  const [userMoves, setUserMoves] = useState(null);

  // Prevent rerendering issues by using the current moment's FEN in React state
  const [fen, setFen] = useState(currentMoment?.fen);

  // Update tree when PGN changes
  useEffect(() => {
    const newTree = chessTree(pgn);
    setTree(newTree);
  }, [pgn]);

  useEffect(() => {
    if (initialMoveIndex === 0 || moments.length <= initialMoveIndex) {
      if (!currentMoment) {
        setCurrentMoment(firstMoment || defaultMoment);
      }
    } else {
      const mainLineMoves = moments.filter(
        (move) => move.depth === 1 && move.move
      );
      const targetMove =
        mainLineMoves[initialMoveIndex] || firstMoment || defaultMoment;
      setCurrentMoment(targetMove);
    }
    setVariations(null);
    setUserMoves(null);
  }, [pgn, initialMoveIndex, moments]);

  const goPrevMoment = () => {
    const prevMoment = getPrevMoment(moments, currentMoment);
    if (!isEmpty(prevMoment)) {
      setCurrentMoment(prevMoment);
      setFen(prevMoment?.fen);
      setVariations(null);
      setUserMoves(null);
    }
  };

  const goNextMoment = () => {
    const nextMoments = getNextMoments(moments, currentMoment);
    if (isEmpty(nextMoments)) {
      return;
    }
    if (nextMoments.length === 1 || autoSelectMainline) {
      setCurrentMoment(nextMoments[0]);
      setFen(nextMoments[0]?.fen);
      setVariations(null);
      setUserMoves(null);
    } else if (nextMoments.length > 1) {
      setVariations(nextMoments);
    }
  };

  const goToMoment = (moment) => {
    setCurrentMoment(moment);
    setFen(moment?.fen);
    setVariations(null);
    setUserMoves(null);
  };

  const getNextMainlineMoment = () => {
    const nextMoments = getNextMoments(moments, currentMoment);
    return nextMoments[0] ?? null;
  };

  const getMoveIndex = (moment) => {
    if (!moment || !moments.length) return 0;
    const mainLineMoves = moments.filter(
      (move) => move.depth === 1 && move.move
    );
    const moveIndex = mainLineMoves.findIndex((move) => move.id === moment.id);
    return moveIndex >= 0 ? moveIndex : 0;
  };

  // == Variations
  const handleVariationChoice = async (moveIndex) => {
    setCurrentMoment(moments[moveIndex]);
    await coffee(10); // Simulate a delay for the variations to update
    setVariations(null);
    setUserMoves(null);
  };

  const handleVariationsCancel = () => {
    setVariations(null);
    setUserMoves(null);
  };

  const handleUserMove = (chess) => {
    const userMove = last(chess.history({ verbose: true }));
    const nextFen = chess.fen();

    const nextMoments = getNextMoments(moments, currentMoment);
    const expectedMoment = nextMoments.find(
      (move) => move && move.move === userMove.san
    );

    if (expectedMoment) {
      return setCurrentMoment(expectedMoment);
    }

    const { newTree, newMoment } = handleUserMoveVariations({
      treeState,
      currentMoment,
      nextMoments,
      nextFen,
      userMove,
    });

    setTree(newTree);
    setCurrentMoment(newMoment);
  };

  const handleUserMovesReset = () => {
    setUserMoves(null);
    goNextMoment();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!variations && useArrowsToMove) {
        if (event.key === 'ArrowLeft') {
          goPrevMoment();
        }
        if (event.key === 'ArrowRight') {
          goNextMoment();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goPrevMoment, goNextMoment, variations]);

  return {
    fen,
    pgn: pgnState,
    tree: treeState,
    moments,
    currentMoment,
    current: currentMoment,
    firstTurn,
    firstMoment,
    lastMoment,
    goPrevMoment,
    goNextMoment,
    goToMoment,
    getNextMainlineMoment,
    getMoveIndex,

    variations,
    onVariationChoice: handleVariationChoice,
    onVariationsCancel: handleVariationsCancel,

    userMoves,
    onUserMove: handleUserMove,
    onUserMovesReset: handleUserMovesReset,
  };
};

export default usePgnViewer;
