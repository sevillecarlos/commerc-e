export const removeRepeatElements = (arr: any) => {
  const paramsArr = arr;
  const uniqueArr = paramsArr.reduce((v: any, obj: { id: number }) => {
    console.log(v.length)
    !v.some((o: { id: number }) => o.id === obj.id) && v.push(obj);
    return v;
  }, []);
  return uniqueArr;
};
