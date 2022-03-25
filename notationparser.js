const validateInput = (input, acceptedInputs) => {

  input = input.toLowerCase();

  ret = undefined;

  acceptedInputs.forEach(str => {
    if(input.includes(str.toLowerCase())) {
      ret = str;
    }
  });

  return ret;

}