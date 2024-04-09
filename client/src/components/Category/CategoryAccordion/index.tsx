import { useState } from "react";
import { Inter } from "next/font/google";

import { Category } from "@/interfaces/Category.interface";
import { Product } from "@/interfaces/Product.interface";
import { CategoryInputs, MenuInputs } from "@/interfaces/Menu.interface";
import Carousel from "@/components/Carousel";
import CategoryForm from "../CategoryForm";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
interface CategoryAccordionProps {
  categoriesData: Category[];
  productsData: Product[];
  active: boolean;
  updateListData: boolean;
  setUpdateListData: React.Dispatch<React.SetStateAction<boolean>>;
}

function CategoryAccordion({
  categoriesData,
  productsData,
  active,
  updateListData,
  setUpdateListData,
}: CategoryAccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isnewCategory, setIsNewCategory] = useState<boolean>(true);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [categoryInputsData, setCategoryInputsData] = useState<CategoryInputs>({
    name: "",
    description: "",
  });
  const [selectedProductCategoryData, setSelectedProductCategoryData] =
    useState<string[]>([]);
  function toggleAccordion() {
    console.log(categoriesData);
    setActiveAccordion((prev) => (prev === "category" ? null : "category"));
  }

  return (
    <div className={`mb-2 rounded ${active ? "" : "hidden"}`}>
      <div
        className="bg-opacity-95 p-3 flex justify-between items-center cursor-pointer rounded"
        onClick={toggleAccordion}
      >
        <span className={`font-bold  ${inter.className} `}>Categories</span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            activeAccordion === "category" ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {activeAccordion === "category" && (
        <div className="p-3 bg-white">
          <Carousel
            data={categoriesData}
            setSelectedItemData={setSelectedProductCategoryData}
            inputData={categoryInputsData}
            setInputsData={setCategoryInputsData}
            setIsNewItem={setIsNewCategory}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            updateListData={updateListData}
            setUpdateListData={setUpdateListData}
            type={"categories"}
          />

          <CategoryForm
            productsData={productsData}
            selectedProductCategoryData={selectedProductCategoryData}
            setSelectedProductCategoryData={setSelectedProductCategoryData}
            categoryInputsData={categoryInputsData}
            setCategoryInputsData={setCategoryInputsData}
            isnewCategory={isnewCategory}
            updateListData={updateListData}
            setUpdateListData={setUpdateListData}
            setCurrentItem={setCurrentItem}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryAccordion;
