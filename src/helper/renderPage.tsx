import ListProducts from "../pages/ListProducts";

export const renderPage = (el: { match: { params: {} } }) => {
  const params: any = el.match.params;
  return <ListProducts categoryId={params} />;
};
