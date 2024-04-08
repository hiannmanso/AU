import { useEffect, useState } from "react";

import axios from "axios";
import MenuAccordion from "../../components/Menu/MenuAccordion";
import CategoryAccordion from "../../components/Category/CategoryAccordion";
import ProductAccordion from "../../components/Product/ProductAccordion";
import { MenuDetails } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import { Category } from "@/interfaces/Category.interface";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function Settings() {
  const { setOptionHeader } = useGlobalContext();
  const [menusData, setMenusData] = useState<MenuDetails[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [selectedProductMenuData, setSelectedProductMenuData] = useState<
    string[]
  >([]);

  useEffect(() => {
    setOptionHeader("settings");
    loaderData("menus", setMenusData);
    loaderData("categories", setCategoriesData);
    loaderData("products", setProductsData);
  }, []);

  function loaderData(
    endpoint: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) {
    axios({
      method: "get",
      url: `http://localhost:3000/${endpoint}`,
    })
      .then((response) => {
        console.log(endpoint, response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="max-w-md mx-auto">
      <MenuAccordion
        menusData={menusData}
        productsData={productsData}
        selectedProductMenuData={selectedProductMenuData}
        setSelectedProductMenuData={setSelectedProductMenuData}
      />
      <CategoryAccordion
        categoriesData={categoriesData}
        productsData={productsData}
        active={true}
      />
      <ProductAccordion
        productsData={productsData}
        categoriesData={categoriesData}
        active={true}
      />
    </div>
  );
}
