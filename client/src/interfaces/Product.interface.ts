import { Category } from "./Category.interface";

export interface Product {
  categoryId: string;

  createdAt: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  updatedAt?: string;
}
export interface ProductsBoxProps {
  productsData: Product[];
  selectedProductMenuData: string[];
  setSelectedProductMenuData: React.Dispatch<React.SetStateAction<string[]>>;
  disable: boolean;
}
export interface ProductEntry {
  createdAt: string;
  id: string;
  menuId: string;
  product: ProductWithCategory;
  productId: string;
  updatedAt: string;
}
interface ProductWithCategory extends Product {
  category: Category;
}
export interface ProductInputs {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}
