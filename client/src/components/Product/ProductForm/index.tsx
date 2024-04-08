import axios from "axios";

import ProductsBox from "@/components/ProductsBox";
import { CategoryInputs, ProductInputs } from "@/interfaces/Menu.interface";
import { Product } from "@/interfaces/Product.interface";
import Form from "@/components/Form";
import { Category } from "@/interfaces/Category.interface";

interface ProductFormProps {
  productsData: Product[];
  selectedProductData: string[];
  setSelectedProductData: React.Dispatch<React.SetStateAction<string[]>>;
  productInputsData: ProductInputs;
  setProductInputsData: React.Dispatch<React.SetStateAction<ProductInputs>>;
  isnewProduct: boolean;
  categoriesData: Category[];
}

function ProductForm({
  productsData,
  selectedProductData,
  setSelectedProductData,
  productInputsData,
  setProductInputsData,
  isnewProduct,
  categoriesData,
}: ProductFormProps) {
  function createNewProduct() {
    console.log(productInputsData);
    axios
      .post("http://localhost:3000/products", {
        name: productInputsData.name,
        categoryId: productInputsData.category,
        description: productInputsData.description,
        price: Number(productInputsData.price),
        image: productInputsData.image,
      })
      .then((response) => {
        console.log(response);
        setProductInputsData({
          name: "",
          description: "",
          category: "",
          image: "",
          price: 0,
        });
        setSelectedProductData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editProduct() {
    axios
      .put(`http://localhost:3000/products/${productInputsData.id}`, {
        name: productInputsData.name,
        categoryId: productInputsData.category,
        description: productInputsData.description,
        price: productInputsData.price,
        image: productInputsData.image,
      })
      .then((response) => {
        console.log(response);
        setProductInputsData({
          name: "",
          description: "",
          category: "",
          image: "",
          price: 0,
        });
        setSelectedProductData([]);
      })
      .catch((err) => {
        console.log(err);
        console.log(productInputsData, productsData);
      });
  }

  const formFields: {
    [key: string]: {
      type: "text" | "select" | "number";
      options?: any[];
      placeholder?: string;
    };
  } = {
    name: { type: "text", placeholder: "Name" },
    description: { type: "text", placeholder: "Description" },
    price: { type: "number", placeholder: "Price" },
    image: { type: "text", placeholder: "Image Url" },
    category: {
      type: "select",
      options: categoriesData.map((item) => {
        return { name: item.name, id: item.id };
      }),
      placeholder: "Select Type",
    },
  };

  return (
    <div className="bg-white flex flex-col">
      <div>
        <Form
          formData={productInputsData}
          setFormData={setProductInputsData}
          formFields={formFields}
          multiplies={false}
        />

        <div className="flex justify-end m-4">
          {isnewProduct ? (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={createNewProduct}
            >
              CREATE NEW CATEGORY
            </button>
          ) : (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={editProduct}
            >
              EDIT CATEGORY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
