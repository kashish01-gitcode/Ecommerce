import { products } from "../assets/frontend_assets/assets";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals and trending styles.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.slice(0, 10).map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;