import ViewProduct from "../pages/ViewProduct";

export const renderViewProduct = (el: { match: { params: {} } }) => {
  const categoryId: any = el.match.params;
  return <ViewProduct categoryId={categoryId} />;
};
