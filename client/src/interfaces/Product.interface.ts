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
