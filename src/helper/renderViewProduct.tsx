import ViewProduct from "../pages/ViewProduct";

export const renderViewProduct = (el: {
  match: { url:string };
}) => {
  const categoryId: string | number = el.match.url;
  return <ViewProduct categoryId={categoryId} />;
};
