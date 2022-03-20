const validateMove = input => {
  let moveString = input.replace(/[\s\-\(\)]+/g, '');

  if (/[o0][o0][o0]/i.test(moveString)) {
    return [
      // white long castling
      {
        piece: 'k',
        from: 'e1',
        to: 'c1',
      },
      // black long castling
      {
        piece: 'k',
        from: 'e8',
        to: 'c8',
      }
    ];
  } else if (/[o0][o0]/i.test(moveString)) {
    return [
      // white short castling
      {
        piece: 'k',
        from: 'e1',
        to: 'g1',
      },
      // black short castling
      {
        piece: 'k',
        from: 'e8',
        to: 'g8',
      }
    ];
  }


  const pawnRegex = /^([a-h])?(x)?([a-h])([1-8])(e\.?p\.?)?(=[qrnbQRNB])?[+#]?$/;
  const pawnResult = moveString.match(pawnRegex);
  if (pawnResult) {
    const [
      _,
      fromFile,
      isCapture,
      toFile,
      toRank,
      enPassant,
      promotion,
    ] = pawnResult;

    if (fromFile === toFile) {
      // Do nothing
      // This disables moves like `bb4` for pawns to avoid ambiguity with bishops
    } else {
      const move = {
        piece: 'p',
        from: `${fromFile || '.'}.`,
        to: `${toFile || '.'}${toRank || '.'}`,
      };

      if (promotion) {
        move.promotionPiece = promotion[1].toLowerCase();
      }

      return move
    }
  }

  const pieceRegex = /^([RQKNBrqknb])([a-h])?([1-8])?(x)?([a-h])([1-8])?[+#]?$/;
  const pieceResult = moveString.match(pieceRegex)
  if (pieceResult) {
    const [
      _,
      pieceName,
      fromFile,
      fromVer,
      isCapture,
      toFile,
      toRank,
    ] = pieceResult;

    return {
      piece: (pieceName).toLowerCase(),
      from: `${fromFile || '.'}${fromVer || '.'}`,
      to: `${toFile || '.'}${toRank || '.'}`,
    }
  }
}