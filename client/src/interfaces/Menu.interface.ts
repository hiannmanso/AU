import { Category } from "./Category.interface";
import { Product } from "./Product.interface";

export interface MenuObject {
  id: string;
  name: string;
  description: string;
  type: string[];
  createdAt: string;
  updatedAt: string;
}
interface ProductsMenu {
  createdAt: string;
  id: string;
  menuId: string;
  productId: string;
  updatedAt: string;
}
export interface MenuCarouselProps {
  data: any[];
  setSelectedItemData: React.Dispatch<React.SetStateAction<string[]>>;
  inputData: any;
  setInputsData: React.Dispatch<React.SetStateAction<any>>;
  setIsNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}
export interface MenuDetails extends MenuObject {
  MenuProduct: ProductsMenu[];
}

export interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}

export interface MenuInputs {
  id?: string;
  name: string;
  description: string;
  type: string[];
}

export interface CategoryInputs {
  id?: string;
  name: string;
  description: string;
}
export interface ProductInputs {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}
