import CardItem from "@/components/CardItem";

import ModalItem from "@/components/ModalItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { ProductEntry } from "@/interfaces/Product.interface";
import { Inter } from "next/font/google";
import DATABASE_URL from "@/api/api";
import Loader from "@/components/Loader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, ProductEntry[]>
  >({});
  const {
    setMenuOptions,
    setOptionHeader,
    setOptionSelected,
    listedProducts,
    setListedProducts,
  } = useGlobalContext();

  useEffect(() => {
    setOptionHeader("menu");
    getCurrentMenus();
  }, []);

  function groupProductsByCategory(products: any) {
    const groupedProducts: Record<string, ProductEntry[]> = {};

    products.forEach((product: ProductEntry) => {
      const categoryName = product.product.category.name;

      if (!groupedProducts[categoryName]) {
        groupedProducts[categoryName] = [];
      }

      groupedProducts[categoryName].push(product);
    });

    return groupedProducts;
  }
  async function getCurrentMenus() {
    try {
      const response = await axios.get(`${DATABASE_URL}/menus/current`);
      const firstCategoryProducts = response.data[0]?.MenuProduct || [];
      setMenuOptions(response.data);
      setListedProducts(firstCategoryProducts);
      setOptionSelected(response.data[0]?.name);
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  useEffect(() => {
    setGroupedProducts(groupProductsByCategory(listedProducts));
  }, [listedProducts]);

  console.log(listedProducts);
  return (
    <>
      <ModalItem />
      <div className="m-auto w-4/5 py-14 px-10">
        {listedProducts.length > 0 ? undefined : (
          <div className="flex justify-center items-center">
            <Loader height={200} width={200} />
          </div>
        )}
        {Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName} className="mb-8">
            <h1 className={`text-2xl font-bold mb-4 ${inter.className}`}>
              {categoryName}
            </h1>
            <div className="flex flex-row justify-start flex-wrap gap-5">
              {products.map((product: ProductEntry, index: number) => (
                <CardItem
                  key={index}
                  data={{
                    titleProduct: product.product.name,
                    description: product.product.description,
                    image: product.product.image,
                    price: product.product.price,
                    category: product.product.category.name,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
