import axios from "axios";

import ProductsBox from "@/components/ProductsBox";
import { CategoryInputs } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import Form from "@/components/Form";

interface CategoryFormProps {
  productsData: Product[];
  selectedProductCategoryData: string[];
  setSelectedProductCategoryData: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  categoryInputsData: CategoryInputs;
  setCategoryInputsData: React.Dispatch<React.SetStateAction<CategoryInputs>>;
  isnewCategory: boolean;
}

function CategoryForm({
  productsData,
  selectedProductCategoryData,
  setSelectedProductCategoryData,
  categoryInputsData,
  setCategoryInputsData,
  isnewCategory,
}: CategoryFormProps) {
  function createNewCategory() {
    axios
      .post("http://localhost:3000/categories", {
        ...categoryInputsData,
      })
      .then((response) => {
        console.log(response);
        setCategoryInputsData({ name: "", description: "" });
        setSelectedProductCategoryData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editCategory() {
    axios
      .put(`http://localhost:3000/categories/${categoryInputsData.id}`, {
        name: categoryInputsData.name,
        description: categoryInputsData.description,
      })
      .then((response) => {
        console.log(response);
        setCategoryInputsData({ name: "", description: "" });
        setSelectedProductCategoryData([]);
      })
      .catch((err) => {
        console.log(err);
        console.log(categoryInputsData, productsData);
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
