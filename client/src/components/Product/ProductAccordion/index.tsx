import { useState } from "react";
import { Inter } from "next/font/google";
import { Product } from "@/interfaces/Product.interface";
import { MenuInputs, ProductInputs } from "@/interfaces/Menu.interface";
import Carousel from "@/components/Carousel";
import ProductForm from "../ProductForm";
import { Category } from "@/interfaces/Category.interface";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
interface ProductAccordionProps {
  productsData: Product[];
  active: boolean;
  categoriesData: Category[];
}

function ProductAccordion({
  productsData,
  active,
  categoriesData,
}: ProductAccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [productInputsData, setProductInputsData] = useState<ProductInputs>({
    name: "",
    description: "",
    category: "",
    image: "",
    price: 0,
  });
  const [selectedProductData, setSelectedProductData] = useState<string[]>([]);
  const [isnewProduct, setIsNewProduct] = useState<boolean>(true);

  function toggleAccordion() {
    setActiveAccordion((prev) => (prev === "product" ? null : "product"));
  }

  return (
    <div className={`mb-2 rounded ${active ? "" : "hidden"}`}>
      <div
        className="bg-opacity-95 p-3 flex justify-between items-center cursor-pointer rounded"
        onClick={toggleAccordion}
      >
        <span className={`font-bold  ${inter.className} `}>Products</span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            activeAccordion === "product" ? "rotate-180" : ""
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
      {activeAccordion === "product" && (
        <div className="p-3 bg-white">
          <Carousel
            data={productsData}
            setSelectedItemData={setSelectedProductData}
            inputData={productInputsData}
            setInputsData={setProductInputsData}
            setIsNewItem={setIsNewProduct}
            type={"products"}
          />
          <ProductForm
            productsData={productsData}
            setSelectedProductData={setSelectedProductData}
            isnewProduct={isnewProduct}
            productInputsData={productInputsData}
            selectedProductData={selectedProductData}
            setProductInputsData={setProductInputsData}
            categoriesData={categoriesData}
          />
          Conteúdo do produto...
        </div>
      )}
    </div>
  );
}

export default ProductAccordion;
