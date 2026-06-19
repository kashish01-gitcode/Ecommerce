import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer"
    >
      <div className="overflow-hidden rounded">
        <img
          className="hover:scale-110 transition duration-500"
          src={image?.[0]}
          
          alt=""
        />
      </div>

      

      <p className="pt-3 pb-1 text-sm">
        {name}
      </p>

      <p className="text-sm font-medium">
        ₹{price}
      </p>
    </Link>
  );
};

export default ProductItem;