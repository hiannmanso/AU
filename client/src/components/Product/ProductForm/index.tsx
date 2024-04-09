import axios from "axios";

import { Product, ProductInputs } from "@/interfaces/Product.interface";
import Form from "@/components/Form";
import { Category } from "@/interfaces/Category.interface";
import { toast } from "react-toastify";
import CardItem from "@/components/CardItem";
import DATABASE_URL from "@/api/api";

interface ProductFormProps {
  productsData: Product[];
  selectedProductData: string[];
  setSelectedProductData: React.Dispatch<React.SetStateAction<string[]>>;
  productInputsData: ProductInputs;
  setProductInputsData: React.Dispatch<React.SetStateAction<ProductInputs>>;
  isnewProduct: boolean;
  categoriesData: Category[];
  updateListData: boolean;
  setUpdateListData: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function ProductForm({
  productsData,
  selectedProductData,
  setSelectedProductData,
  productInputsData,
  setProductInputsData,
  isnewProduct,
  categoriesData,
  updateListData,
  setUpdateListData,
  setCurrentItem,
}: ProductFormProps) {
  function createNewProduct() {
    console.log(productInputsData);
    axios
      .post(`${DATABASE_URL}/products`, {
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
        setUpdateListData(!updateListData);
        toast.success("Product created successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }
  function editProduct() {
    axios
      .put(`${DATABASE_URL}/products/${productInputsData.id}`, {
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
        setUpdateListData(!updateListData);
        setCurrentItem(null);
        toast.success("Product updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
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
        <div className="flex items-center justify-center">
          <CardItem
            data={{
              titleProduct: productInputsData.name,
              category: productInputsData.category,
              description: productInputsData.description,
              image: productInputsData.image,
              price: productInputsData.price,
            }}
          />
        </div>

        <div className="flex justify-end m-4">
          {isnewProduct ? (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={createNewProduct}
            >
              CREATE NEW PRODUCT
            </button>
          ) : (
            <button
              className="bg-primary px-2 py-1 text-white rounded-md shadow-md"
              onClick={editProduct}
            >
              EDIT PRODUCT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
