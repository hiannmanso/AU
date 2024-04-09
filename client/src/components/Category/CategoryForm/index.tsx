import axios from "axios";

import ProductsBox from "@/components/ProductsBox";
import { CategoryInputs } from "@/interfaces/Category.interface";
import { Product } from "@/interfaces/Product.interface";
import Form from "@/components/Form";
import { toast } from "react-toastify";
import DATABASE_URL from "@/api/api";

interface CategoryFormProps {
  productsData: Product[];
  selectedProductCategoryData: string[];
  setSelectedProductCategoryData: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  categoryInputsData: CategoryInputs;
  setCategoryInputsData: React.Dispatch<React.SetStateAction<CategoryInputs>>;
  isnewCategory: boolean;
  updateListData: boolean;
  setUpdateListData: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function CategoryForm({
  productsData,
  selectedProductCategoryData,
  setSelectedProductCategoryData,
  categoryInputsData,
  setCategoryInputsData,
  isnewCategory,
  updateListData,
  setUpdateListData,
  setCurrentItem,
}: CategoryFormProps) {
  function createNewCategory() {
    axios
      .post(`${DATABASE_URL}/categories`, {
        ...categoryInputsData,
      })
      .then((response) => {
        console.log(response);
        setCategoryInputsData({ name: "", description: "" });
        setSelectedProductCategoryData([]);
        setUpdateListData(!updateListData);
        toast.success("Category created successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  function editCategory() {
    axios
      .put(`${DATABASE_URL}/categories/${categoryInputsData.id}`, {
        name: categoryInputsData.name,
        description: categoryInputsData.description,
      })
      .then((response) => {
        console.log(response);
        setCategoryInputsData({ name: "", description: "" });
        setSelectedProductCategoryData([]);
        setUpdateListData(!updateListData);
        setCurrentItem(null);
        toast.success("Category updated successfully!");
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
  };

  return (
    <div className="bg-white flex flex-col">
      <div>
        <Form
          formData={categoryInputsData}
          setFormData={setCategoryInputsData}
          formFields={formFields}
          multiplies={false}
        />
        {!isnewCategory ? (
          <ProductsBox
            productsData={productsData}
            selectedProductMenuData={selectedProductCategoryData}
            setSelectedProductMenuData={setSelectedProductCategoryData}
            disable={true}
          />
        ) : undefined}
        <div className="flex justify-end m-4">
          {isnewCategory ? (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={createNewCategory}
            >
              CREATE NEW CATEGORY
            </button>
          ) : (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={editCategory}
            >
              EDIT CATEGORY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
