import { useState } from "react";

import { MenuDetails, MenuInputs } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import MenuForm from "../MenuForm";
import { Inter } from "next/font/google";
import Carousel from "../../Carousel";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
interface MenuAccordionProps {
  menusData: MenuDetails[];
  productsData: Product[];
  selectedProductMenuData: string[];
  setSelectedProductMenuData: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MenuAccordion({
  menusData,
  productsData,
  selectedProductMenuData,
  setSelectedProductMenuData,
}: MenuAccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isnewMenu, setIsNewMenu] = useState<boolean>(true);

  const [menuInputsData, setMenuInputsData] = useState<MenuInputs>({
    name: "",
    description: "",
    type: [],
  });
  function toggleAccordion(accordionName: string) {
    setActiveAccordion((prev) =>
      prev === accordionName ? null : accordionName
    );
  }
  return (
    <div className="mb-2 rounded">
      <div
        className="bg-opacity-95 p-3 flex justify-between items-center cursor-pointer rounded"
        onClick={() => toggleAccordion("menu")}
      >
        <span className={`font-bold  ${inter.className} `}>Menus</span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            activeAccordion === "menu" ? "rotate-180" : ""
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
      {activeAccordion === "menu" && (
        <div className="bg-white flex flex-col">
          <Carousel
            data={menusData}
            setSelectedItemData={setSelectedProductMenuData}
            inputData={menuInputsData}
            setInputsData={setMenuInputsData}
            setIsNewItem={setIsNewMenu}
            type={"menus"}
          />
          <MenuForm
            productsData={productsData}
            selectedProductMenuData={selectedProductMenuData}
            setSelectedProductMenuData={setSelectedProductMenuData}
            menuInputsData={menuInputsData}
            setMenuInputsData={setMenuInputsData}
            isnewMenu={isnewMenu}
          />
        </div>
      )}
    </div>
  );
}
