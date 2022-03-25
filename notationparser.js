const validateMove = (input, legalMoves) => {

  input = input.toLowerCase();

  ret = undefined;

  legalMoves.forEach(str => {
    if(input.includes(str.toLowerCase())) {
      ret = str;
    }
  });

  return ret;

}

const validatePiece = input => {

  input = input.toLowerCase();

  ret = undefined;

  pieces = ["pawn", "king", "queen", "bishop", "knight", "rook"];

  pieces.forEach(str => {
    if(input.includes(str)) {
      ret = str;
    }
  });

  return ret;
}