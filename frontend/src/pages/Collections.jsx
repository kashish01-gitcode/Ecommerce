import { useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const Collection = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = products.filter((item) => {

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category.length === 0 ||
      category.includes(item.category);

    const matchesSubCategory =
      subCategory.length === 0 ||
      subCategory.includes(item.subCategory);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubCategory
    );
  });

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">

      {/* FILTERS */}

      <div className="min-w-60">

        <p className="my-2 text-xl font-medium">
          FILTERS
        </p>

        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">
            CATEGORIES
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleCategory("Men")
                }
              />{" "}
              Men
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleCategory("Women")
                }
              />{" "}
              Women
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleCategory("Kids")
                }
              />{" "}
              Kids
            </label>
          </div>
        </div>

        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">
            TYPE
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleSubCategory("Topwear")
                }
              />{" "}
              Topwear
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleSubCategory("Bottomwear")
                }
              />{" "}
              Bottomwear
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() =>
                  toggleSubCategory("Winterwear")
                }
              />{" "}
              Winterwear
            </label>
          </div>
        </div>

      </div>

      {/* PRODUCTS */}

      <div className="flex-1">

        <div className="flex flex-col gap-5">

          <div className="flex justify-between items-center">

            <Title
              text1={"ALL"}
              text2={"COLLECTIONS"}
            />

            <input
              type="text"
              placeholder="Search Products..."
              className="border px-4 py-2 rounded-md w-64"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

            {filteredProducts.map((item) => (
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

      </div>

    </div>
  );
};

export default Collection;