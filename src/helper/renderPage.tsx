import ListProducts from "../pages/ListProducts";

export const renderPage = (el: {
  match: { params: { id: string | number } };
}) => {
  console.log(el.match.params)
  const categoryId: string | number = el.match.params.id;
  return <ListProducts categoryId={categoryId} />;
};
