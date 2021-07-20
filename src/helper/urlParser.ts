export const urlParser = (url: string) => {
  const parseUrl = url.split("/").filter((x) => x);
  return parseUrl;
};
