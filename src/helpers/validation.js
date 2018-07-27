const NUMERIC = /[0-9]/;

export const handleOnlyNumbersValidation = (event) => {
  const keyChar = String.fromCharCode(event.which || event.keyCode);

  if (!NUMERIC.test(keyChar)) {
    event.preventDefault();
  }
};
