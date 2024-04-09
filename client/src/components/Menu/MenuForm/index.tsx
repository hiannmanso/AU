import { ChangeEvent } from "react";
import axios from "axios";

import ProductsBox from "@/components/ProductsBox";
import { MenuInputs } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import Form from "@/components/Form";
import { toast } from "react-toastify";
import DATABASE_URL from "@/api/api";

interface MenuFormProps {
  productsData: Product[];
  selectedProductMenuData: string[];
  setSelectedProductMenuData: React.Dispatch<React.SetStateAction<string[]>>;
  menuInputsData: MenuInputs;
  setMenuInputsData: React.Dispatch<React.SetStateAction<MenuInputs>>;
  isnewMenu: boolean;
  setIsNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  updateListData: boolean;
  setUpdateListData: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function MenuForm({
  productsData,
  selectedProductMenuData,
  setSelectedProductMenuData,
  menuInputsData,
  setMenuInputsData,
  isnewMenu,
  setIsNewItem,
  updateListData,
  setUpdateListData,
  setCurrentItem,
}: MenuFormProps) {
  function createNewMenu() {
    axios
      .post(`${DATABASE_URL}/menus`, {
        ...menuInputsData,
        productsId: selectedProductMenuData,
      })
      .then((response) => {
        console.log(response);
        setMenuInputsData({ name: "", description: "", type: [] });
        setSelectedProductMenuData([]);
        setUpdateListData(!updateListData);
        setIsNewItem(true);
        toast.success("Menu created successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  function editMenu() {
    axios
      .put(`${DATABASE_URL}/menus/${menuInputsData.id}`, {
        name: menuInputsData.name,
        description: menuInputsData.description,
        type: menuInputsData.type,
        productsId: selectedProductMenuData,
      })
      .then((response) => {
        console.log(response);
        setMenuInputsData({ name: "", description: "", type: [] });
        setSelectedProductMenuData([]);
        setUpdateListData(!updateListData);
        setIsNewItem(true);
        setCurrentItem(null);
        toast.success("Menu updated successfully!");
      })
      .catch((err) => {
        console.log(err);

        toast.error(err.message);
      });
  }

  const formFields: {
    [key: string]: {
      type: "text" | "select";
      options?: any[];
      placeholder?: string;
    };
  } = {
    name: { type: "text", placeholder: "Name" },
    description: { type: "text", placeholder: "Description" },
    type: {
      type: "select",
      options: [
        { name: "day", id: "day" },
        { name: "night", id: "night" },
      ],
      placeholder: "Select Type",
    },
  };

  return (
    <div className="bg-white flex flex-col">
      <div>
        <Form
          formData={menuInputsData}
          setFormData={setMenuInputsData}
          formFields={formFields}
          multiplies={true}
        />
        <ProductsBox
          productsData={productsData}
          selectedProductMenuData={selectedProductMenuData}
          setSelectedProductMenuData={setSelectedProductMenuData}
          disable={false}
        />
        <div className="flex justify-end m-4">
          {isnewMenu ? (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={createNewMenu}
            >
              CREATE NEW MENU
            </button>
          ) : (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={editMenu}
            >
              EDIT MENU
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuForm;
