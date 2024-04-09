import { useEffect, useState } from "react";

import axios from "axios";
import MenuAccordion from "../../components/Menu/MenuAccordion";
import CategoryAccordion from "../../components/Category/CategoryAccordion";
import ProductAccordion from "../../components/Product/ProductAccordion";
import { MenuDetails } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import { Category } from "@/interfaces/Category.interface";
import { useGlobalContext } from "@/contexts/GlobalContext";
import DATABASE_URL from "@/api/api";
export default function Settings() {
  const { setOptionHeader } = useGlobalContext();
  const [menusData, setMenusData] = useState<MenuDetails[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [selectedProductMenuData, setSelectedProductMenuData] = useState<
    string[]
  >([]);
  const [updateMenuData, setUpdateMenuData] = useState<boolean>(false);
  const [updateCategoryData, setUpdateCategoryData] = useState<boolean>(false);
  const [updateProductData, setUpdateProductData] = useState<boolean>(false);

  setOptionHeader("settings");
  useEffect(() => {
    console.log(process.env.DATABASE_URL_TESTE);
    loaderData("menus", setMenusData);
  }, [updateMenuData]);
  useEffect(() => {
    loaderData("categories", setCategoriesData);
  }, [updateCategoryData]);
  useEffect(() => {
    loaderData("products", setProductsData);
  }, [updateProductData]);

  function loaderData(
    endpoint: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) {
    axios({
      method: "get",
      url: `${DATABASE_URL}/${endpoint}`,
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
        updateListData={updateMenuData}
        setUpdateListData={setUpdateMenuData}
      />
      <CategoryAccordion
        categoriesData={categoriesData}
        productsData={productsData}
        active={true}
        updateListData={updateCategoryData}
        setUpdateListData={setUpdateCategoryData}
      />
      <ProductAccordion
        productsData={productsData}
        categoriesData={categoriesData}
        active={true}
        updateListData={updateProductData}
        setUpdateListData={setUpdateProductData}
      />
    </div>
  );
}
