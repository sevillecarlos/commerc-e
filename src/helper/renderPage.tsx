import ListProducts from "../pages/ListProducts";

export const renderPage = (el: {
  match: { params: { id: string | number } };
}) => {
  const categoryId: string | number = el.match.params.id;
  return <ListProducts categoryId={categoryId} />;
};
