import { useParams } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);

  const productData = products.find(
    (item) => item._id === productId
  );

  if (!productData) {
    return <div className="py-20">Product Not Found</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        <div className="flex-1">
          <img
            className="w-full max-w-[500px]"
            src={productData.image[0]}
            alt=""
          />
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          <p className="mt-5 text-3xl font-medium">
            ₹{productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            Premium quality product with excellent comfort and style.
          </p>

          <button
  onClick={() => addToCart(productData._id)}
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-8"
>
  ADD TO CART
</button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>Easy Return & Exchange Policy</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Product;