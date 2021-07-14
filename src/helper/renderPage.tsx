import ListProducts from "../pages/ListProducts";

export const renderPage = (el: string) => {
  console.log(el.match);
  const categoryId = "23";
  return <ListProducts categoryId={categoryId} />;
};
