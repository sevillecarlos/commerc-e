import PropTypes from "prop-types";

const ListProducts = (props: { categoryId: string }) => {
  const { categoryId } = props;
  return (
    <div>
      <p>{categoryId}</p>
    </div>
  );
};

ListProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ListProducts;
