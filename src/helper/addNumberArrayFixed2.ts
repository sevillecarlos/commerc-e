export const addNumberArray = (arr: Array<number>) =>
  arr.reduce((acc: any, curr: any) => acc + curr).toFixed(2);
