const validateInput = (input, acceptedInputs) => {

  input = input.toLowerCase();

  let ret = undefined;

  let count = 0;

  acceptedInputs.forEach(str => {
    if(input.includes(str.toLowerCase())) {
      ret = str;
      count++;
    }
  });

  // Pawn moves will register as other moves as well
  // This will only check moves with a length of 2, should be only pawn moves
  if(count > 1) {
    acceptedInputs.forEach(str => {
      if(str.length == 2) {
        if(input.includes(str.toLowerCase())) {
          ret = str;
          count++;
        }
      }
    });
  }

  return ret;

}