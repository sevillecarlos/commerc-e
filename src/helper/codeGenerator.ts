const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const codeGenerator = (length: number) => {
  let code = "";
  const numbers = range(0, 9, 1);
  const letters = range("a".charCodeAt(0), "z".charCodeAt(0), 1).map((x) =>
    String.fromCharCode(x)
  );
  const bigArr = [...numbers, ...letters];
  for (let index = 0; index < length; index++) {
    code += bigArr[Math.floor(Math.random() * bigArr.length )];
  }
  return code;
};

