import { Product } from "./Product.interface";

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}
export interface CategoryInputs {
  id?: string;
  name: string;
  description: string;
}
